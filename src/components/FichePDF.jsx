import React from 'react';

export default function FichePDF({ course }) {
  const iconColor = course?.iconColor || '#6366F1';

  // Versões suaves para impressão
  const headerBg  = iconColor + 'CC'; // 80% opacidade
  const accentBg  = iconColor + '12'; // fundo muito pâle
  const borderCol = iconColor + '40'; // borda suave

  const generatePDF = () => {
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) {
      alert('Autorisez les pop-ups pour télécharger la fiche.');
      return;
    }

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <title>NEXTPLAN — ${course.title}</title>
  <style>
    /* ── RESET ── */
    * { margin: 0; padding: 0; box-sizing: border-box; }

    /* ── FONTS ── */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    body {
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      background: #F8F7FF;
      color: #2D2D4E;
      font-size: 13px;
      line-height: 1.6;
    }

    /* ── LAYOUT ── */
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: #F8F7FF;
    }

    /* ── HEADER ── */
    .header {
      background: linear-gradient(135deg, ${headerBg} 0%, ${iconColor}99 100%);
      padding: 36px 44px 28px;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      right: -40px; top: -40px;
      width: 180px; height: 180px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
    }
    .header::after {
      content: '';
      position: absolute;
      right: 80px; bottom: -40px;
      width: 110px; height: 110px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
    }
    .logo {
      font-size: 16px;
      font-weight: 800;
      color: rgba(255,255,255,0.95);
      letter-spacing: -0.02em;
      margin-bottom: 24px;
    }
    .logo span {
      font-weight: 300;
      color: rgba(255,255,255,0.75);
    }
    .logo small {
      font-size: 10px;
      font-weight: 500;
      color: rgba(255,255,255,0.55);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-left: 10px;
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.35);
      font-size: 9px;
      font-weight: 700;
      color: white;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 800;
      color: white;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .header .tagline {
      font-size: 13px;
      color: rgba(255,255,255,0.82);
      font-style: italic;
    }

    /* ── CORPS ── */
    .body {
      padding: 24px 44px 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* ── CARDS ── */
    .card {
      background: white;
      border-radius: 12px;
      padding: 18px 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .card-accent {
      border-left: 3px solid ${iconColor}80;
    }
    .card-light {
      background: ${accentBg};
      border: 1px solid ${borderCol};
    }
    .card h2 {
      font-size: 10px;
      font-weight: 700;
      color: ${iconColor};
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
    }
    .card p {
      font-size: 12.5px;
      color: #4a4a6a;
      line-height: 1.75;
    }

    /* ── KEY POINTS ── */
    .keypoint {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      padding: 6px 0;
      border-bottom: 1px solid #F0EEF8;
    }
    .keypoint:last-child { border-bottom: none; }
    .keypoint-dot {
      width: 18px; height: 18px;
      border-radius: 50%;
      background: ${accentBg};
      border: 1.5px solid ${borderCol};
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
    }
    .keypoint-dot-inner {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: ${iconColor};
    }
    .keypoint span {
      font-size: 12.5px;
      color: #3a3a5a;
      line-height: 1.55;
    }

    /* ── FORMULES ── */
    .formula {
      font-family: 'Courier New', monospace;
      font-size: 12px;
      font-weight: 600;
      color: #1a1a2e;
      background: #F5F4FF;
      border: 1px solid ${borderCol};
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* ── QUIZ ── */
    .quiz-option {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 7px 10px;
      border-radius: 7px;
      margin-bottom: 5px;
      font-size: 12px;
    }
    .quiz-option.correct {
      background: ${accentBg};
      border: 1px solid ${borderCol};
      font-weight: 600;
      color: #1a1a2e;
    }
    .quiz-option.incorrect {
      background: #F8F8FC;
      color: #6B6B8A;
    }
    .quiz-letter {
      font-weight: 700;
      font-size: 11px;
      width: 16px;
      flex-shrink: 0;
      color: ${iconColor};
    }
    .quiz-explanation {
      font-size: 11.5px;
      color: #6B6B8A;
      font-style: italic;
      background: #F8F8FC;
      border-radius: 6px;
      padding: 8px 10px;
      margin-top: 8px;
      line-height: 1.6;
    }

    /* ── MÉTHODE D'APPRENTISSAGE ── */
    .method-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .method-step {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      background: white;
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .method-num {
      font-size: 16px;
      font-weight: 800;
      color: ${iconColor};
      flex-shrink: 0;
      line-height: 1.2;
      font-family: 'Courier New', monospace;
    }
    .method-content { flex: 1; }
    .method-content strong {
      display: block;
      font-size: 12.5px;
      color: #1a1a2e;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .method-content p {
      font-size: 11px;
      color: #5a5a7a;
      line-height: 1.55;
      margin: 0;
    }

    /* ── À RETENIR (liste détaillée) ── */
    .retain-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .retain-list li {
      font-size: 12px;
      color: #4a4a6a;
      line-height: 1.6;
      padding-left: 14px;
      position: relative;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .retain-list li:before {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${iconColor};
    }
    .retain-list li strong {
      color: #1a1a2e;
      font-weight: 700;
    }

    /* ── PARAGRAPHES ── */
    .card p + p {
      margin-top: 8px;
    }
    .section-highlight {
      margin-top: 10px;
      padding: 10px 14px;
      border-left: 3px solid ${iconColor};
      background: ${accentBg};
      border-radius: 8px;
      font-size: 11.5px;
      color: #2D2D4E;
      font-weight: 600;
      line-height: 1.5;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .section-highlight-tag {
      display: block;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: ${iconColor};
      margin-bottom: 4px;
    }

    /* ── FORMULES ENRICHIES ── */
    .formula-card {
      background: white;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 8px;
      border-left: 3px solid ${iconColor};
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .formula-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: #6B6B8A;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .formula-expr {
      font-family: 'Courier New', monospace;
      font-size: 12.5px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 6px;
    }
    .formula-when, .formula-example {
      font-size: 11px;
      line-height: 1.55;
      color: #5a5a7a;
      margin-top: 4px;
    }
    .formula-when strong, .formula-example strong {
      color: ${iconColor};
      font-weight: 700;
      font-size: 9.5px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-block;
      margin-right: 6px;
    }
    .formula-example {
      background: #F8F8FC;
      padding: 6px 10px;
      border-radius: 6px;
      margin-top: 6px;
      font-style: italic;
    }

    /* ── ÉTAPES DE RÉSOLUTION ── */
    .step-card {
      background: white;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 8px;
      border-left: 3px solid ${iconColor};
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .step-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }
    .step-num-badge {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: ${iconColor};
      color: white;
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .step-title {
      font-size: 12px;
      font-weight: 700;
      color: #1a1a2e;
      line-height: 1.3;
    }
    .step-row {
      font-size: 11px;
      line-height: 1.55;
      color: #5a5a7a;
      margin-top: 4px;
    }
    .step-row-lbl {
      color: ${iconColor};
      font-weight: 700;
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-block;
      margin-right: 6px;
    }
    .step-calc {
      font-family: 'Courier New', monospace;
      font-size: 11px;
      background: #F5F4FF;
      padding: 5px 8px;
      border-radius: 5px;
      color: #1a1a2e;
      margin-top: 3px;
    }
    .step-tip {
      background: ${accentBg};
      border-left: 2px solid ${iconColor};
      padding: 6px 10px;
      border-radius: 6px;
      font-style: italic;
      margin-top: 4px;
    }

    /* ── FOOTER ── */
    .footer {
      margin-top: 8px;
      padding: 12px 44px;
      border-top: 1px solid #E8E6F0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .footer-left {
      font-size: 10px;
      color: #9090b0;
    }
    .footer-right {
      font-size: 10px;
      font-weight: 600;
      color: ${iconColor};
    }

    /* ── PRINT ── */
    @media print {
      body { background: white; }
      .page { width: 100%; margin: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .card { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .card-light { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .formula { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .quiz-option.correct { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      @page {
        size: A4 portrait;
        margin: 0;
      }
    }
  </style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="logo">NEXT<span>PLAN</span><small>Planification et Contrôle · M1 MSI Paris 1</small></div>
    <div class="badge">${course.tier === 'free' ? 'GRATUIT' : 'PREMIUM'} · FICHE DE SYNTHÈSE</div>
    <h1>${course.title || ''}</h1>
    ${course.tagline ? `<div class="tagline">${course.tagline}</div>` : ''}
  </div>

  <!-- CORPS -->
  <div class="body">

    ${course.keyPoints?.length ? `
    <div class="card">
      <h2>Compétences acquises</h2>
      ${course.keyPoints.map(p => `
        <div class="keypoint">
          <div class="keypoint-dot"><div class="keypoint-dot-inner"></div></div>
          <span>${p}</span>
        </div>
      `).join('')}
    </div>` : ''}

    ${course.content?.intro ? `
    <div class="card card-accent">
      <h2>Introduction</h2>
      ${course.content.intro.split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')}
    </div>` : ''}

    ${course.content?.sections?.map(s => `
    <div class="card card-accent">
      <h2>${s.title}</h2>
      ${(s.body || '').split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')}
      ${s.highlight ? `
        <div class="section-highlight">
          <span class="section-highlight-tag">À RETENIR</span>
          ${s.highlight}
        </div>
      ` : ''}
    </div>`).join('') || ''}

    ${course.content?.formulas?.length ? `
    <div class="card card-light">
      <h2>Formules essentielles</h2>
      ${course.content.formulas.map((f, i) => {
        if (typeof f === 'string') {
          return `<div class="formula">${f}</div>`
        }
        return `
          <div class="formula-card">
            ${f.label ? `<div class="formula-label">F${i + 1} · ${f.label}</div>` : ''}
            <div class="formula-expr">${f.expr}</div>
            ${f.when ? `<div class="formula-when"><strong>Quand</strong>${f.when}</div>` : ''}
            ${f.example ? `<div class="formula-example"><strong>Exemple</strong>${f.example}</div>` : ''}
          </div>
        `
      }).join('')}
    </div>` : ''}

    ${course.content?.exerciseSteps?.length ? `
    <div class="card">
      <h2>Exercice résolu — pas à pas</h2>
      <p style="font-size:11.5px;color:#6B6B8A;margin-bottom:12px;">${course.content?.exampleTitle || ''}</p>
      ${course.content.exerciseSteps.map((step, i) => `
        <div class="step-card">
          <div class="step-header">
            <div class="step-num-badge">${String(i + 1).padStart(2, '0')}</div>
            <div class="step-title">${step.title}</div>
          </div>
          ${step.intro ? `<div class="step-row"><span class="step-row-lbl">Contexte</span>${step.intro}</div>` : ''}
          ${step.calc ? `<div class="step-calc">${step.calc}</div>` : ''}
          ${step.result ? `<div class="step-row"><span class="step-row-lbl">Résultat</span>${step.result}</div>` : ''}
          ${step.tip ? `<div class="step-tip"><span class="step-row-lbl">Lecture</span>${step.tip}</div>` : ''}
        </div>
      `).join('')}
    </div>` : ''}

    <div class="card">
      <h2>Méthode d'apprentissage recommandée</h2>
      <div class="method-grid">
        <div class="method-step">
          <div class="method-num">01</div>
          <div class="method-content">
            <strong>Lire activement</strong>
            <p>Parcourez l'introduction et les concepts en reformulant chaque idée avec vos propres mots. La compréhension n'est réelle que lorsque vous pouvez expliquer la notion sans relire la définition.</p>
          </div>
        </div>
        <div class="method-step">
          <div class="method-num">02</div>
          <div class="method-content">
            <strong>Visionner la vidéo</strong>
            <p>D'un seul trait, sans interruption majeure, pour saisir la dynamique d'ensemble. Puis revenez sur les passages denses en pause active : reformulez avant de poursuivre.</p>
          </div>
        </div>
        <div class="method-step">
          <div class="method-num">03</div>
          <div class="method-content">
            <strong>Traiter l'exercice</strong>
            <p>Avant de regarder la correction. 10 à 15 minutes seul. L'écart entre votre raisonnement initial et la solution produit l'apprentissage le plus durable.</p>
          </div>
        </div>
        <div class="method-step">
          <div class="method-num">04</div>
          <div class="method-content">
            <strong>Quiz à 80 %</strong>
            <p>Visez ce score minimum pour considérer le module comme acquis. Sinon, reprenez les sections concernées : la répétition espacée ancre durablement les apprentissages.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-light">
      <h2>À retenir absolument</h2>
      <ul class="retain-list">
        <li><strong>Les définitions précises</strong> du module : elles diffèrent du langage courant et c'est ce que les examens vérifient en priorité.</li>
        <li><strong>L'enchaînement logique</strong> entre les notions : aucun concept ne s'utilise isolément, ils forment un système cohérent.</li>
        <li><strong>Le cas concret d'application</strong> : sachez transposer la méthode dans un contexte nouveau, pas seulement répéter l'exemple.</li>
        <li><strong>L'interprétation des résultats</strong> : un chiffre seul n'a aucune valeur — c'est la lecture stratégique qui compte.</li>
      </ul>
    </div>

    ${course.quiz?.[0] ? `
    <div class="card">
      <h2>Question de vérification</h2>
      <p style="font-weight:600;margin-bottom:10px;">${course.quiz[0].question}</p>
      ${course.quiz[0].options.map((opt, i) => `
        <div class="quiz-option ${i === course.quiz[0].correct ? 'correct' : 'incorrect'}">
          <span class="quiz-letter">${['A','B','C','D'][i]}</span>
          ${opt}
          ${i === course.quiz[0].correct ? '<span style="margin-left:auto;font-size:11px;color:'+iconColor+'">✓</span>' : ''}
        </div>
      `).join('')}
      ${course.quiz[0].explanation ? `
        <div class="quiz-explanation">${course.quiz[0].explanation}</div>
      ` : ''}
    </div>` : ''}

  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-left">NEXTPLAN · Planification et Contrôle · M1 MSI Paris 1 Panthéon-Sorbonne</div>
    <div class="footer-right">nextplan.github.io</div>
  </div>

</div>
<script>
  window.onload = function() {
    setTimeout(function() {
      window.print();
    }, 800);
  };
</script>
</body>
</html>`;

    win.document.write(html);
    win.document.close();
  };

  return (
    <button
      onClick={generatePDF}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '11px 22px',
        borderRadius: '10px',
        border: `1.5px solid ${iconColor}40`,
        background: `${iconColor}08`,
        color: iconColor,
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${iconColor}15`;
        e.currentTarget.style.borderColor = `${iconColor}70`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${iconColor}08`;
        e.currentTarget.style.borderColor = `${iconColor}40`;
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Télécharger la fiche PDF
    </button>
  );
}
