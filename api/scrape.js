export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: 'ANTHROPIC_API_KEY manquante' });

  const { url, sector, modules = [], skuList = [], depth = 'rapid' } = req.body || {};
  if (!url || !sector) return res.status(400).json({ error: 'url et sector requis' });

  const name = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];

  // Scraping simple
  let pageContent = `Analyse du concurrent ${name} dans le secteur "${sector}".`;
  try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 10000);
    const r = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'fr-FR,fr;q=0.9',
      }
    });
    if (r.ok) {
      const html = await r.text();
      const title = (html.match(/<title[^>]*>([\s\S]{0,200}?)<\/title>/i) || [])[1]?.replace(/<[^>]+>/g, '').trim() || '';
      const prices = [...new Set((html.match(/\d+[,.]?\d{0,2}\s*€/g) || []))].slice(0, 15).join(' | ');
      const promos = [...new Set((html.match(/(-\d+\s*%|promo|solde|réduction|livraison offerte|gratuit)/gi) || []).map(p => p.toLowerCase()))].slice(0, 10).join(', ');
      const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 5000);
      pageContent = `TITRE: ${title}\nPRIX DÉTECTÉS: ${prices || 'aucun'}\nPROMOS: ${promos || 'aucune'}\nCONTENU: ${text}`;
    }
  } catch (_) {}

  const modLabels = {
    prices:   'Prix & Promos — benchmark tarifaire, prix barrés, codes promo',
    ux:       'UX/Tunnel — navigation, checkout, CTA, frictions',
    seo:      'SEO/SEA — mots-clés, balises, structure, annonces',
    tech:     'Performance Technique — vitesse, mobile, sécurité',
    stock:    'Stocks & Réassurance — dispo, badges confiance, avis, garanties',
    delivery: 'Livraison — délais, franco, retours, click&collect',
    loyalty:  'Fidélisation — programme fidélité, compte pro, abonnements',
    threats:  'Menaces & Opportunités — forces, faiblesses, angles à exploiter',
  };

  const modsJson = modules.length
    ? modules.map(m => `"${m}": "<analyse ${modLabels[m] || m} en 3-4 phrases précises et actionnables>"`).join(',\n    ')
    : '"general": "<analyse générale du concurrent en 4 phrases>"';

  const prompt = `Tu es un expert en Market Intelligence pour le secteur "${sector}".
Concurrent analysé : ${name} (${url})
Profondeur : ${depth === 'deep' ? 'Analyse profonde' : 'Analyse rapide'}
${skuList.length ? `SKU à benchmarker : ${skuList.slice(0, 8).join(', ')}` : ''}

DONNÉES SCRAPPÉES DU SITE :
${pageContent}

Réponds UNIQUEMENT avec du JSON valide, sans markdown, sans texte avant ou après :
{
  "scores": {
    "prix": <entier 0-100>,
    "ux": <entier 0-100>,
    "seo": <entier 0-100>,
    "tech": <entier 0-100>,
    "marketing": <entier 0-100>,
    "menace": <entier 0-100>
  },
  "promos_actives": "<string court max 80 chars>",
  "livraison": "<string court>",
  "statut": "<exactement l'un de: Agressif, Solide, Moyen, Faible>",
  "analyses": {
    ${modsJson}
  },
  "plan_attaque": [
    "<action 1>",
    "<action 2>",
    "<action 3>",
    "<action 4>",
    "<action 5>"
  ]
}`;

  try {
    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!aiRes.ok) {
      const err = await aiRes.text();
      return res.status(500).json({ error: `Claude API erreur ${aiRes.status}: ${err.slice(0, 200)}` });
    }

    const aiData = await aiRes.json();
    const raw = aiData.content?.[0]?.text || '{}';
    const clean = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      parsed = {
        scores: { prix: 50, ux: 50, seo: 50, tech: 50, marketing: 50, menace: 50 },
        promos_actives: 'Voir analyse détaillée',
        livraison: 'Voir site',
        statut: 'Moyen',
        analyses: { general: clean.slice(0, 600) },
        plan_attaque: ['Relancer pour de meilleurs résultats']
      };
    }

    return res.status(200).json({ ...parsed, url, name });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
