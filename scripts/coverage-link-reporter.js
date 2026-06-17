const fs = require('fs');
const path = require('path');

class CoverageLinkReporter {
  onEnd() {
    const reportDir = path.join(process.cwd(), 'playwright-report');
    const indexFile = path.join(reportDir, 'index.html');

    if (!fs.existsSync(indexFile)) return;

    let html = fs.readFileSync(indexFile, 'utf-8');

    const linkHtml = `
      <div style="margin:20px 0; padding:10px; background:#eef; border-radius:6px;">
        <a href="./coverage/index.html" target="_blank" style="font-size:16px; font-weight:bold;">
          📊 Coverage Report を開く
        </a>
      </div>
    `;

    html = html.replace('</body>', `${linkHtml}</body>`);

    fs.writeFileSync(indexFile, html, 'utf-8');
  }
}

module.exports = CoverageLinkReporter;
