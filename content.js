let qrCodeVisible = false;

function createLogoButton(favicon) {
  const button = document.createElement('div');
  button.id = 'qr-code-logo-button';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-image: url('${favicon}');
    background-size: cover;
    background-position: center;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  `;
  document.body.appendChild(button);
  return button;
}

function createQRCodeContainer() {
  const container = document.createElement('div');
  container.id = 'qr-code-container';
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9998;
    background-color: white;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    display: none;
  `;
  document.body.appendChild(container);
  return container;
}

function generateQRCode(url, title, favicon) {
  const logoButton = createLogoButton(favicon);
  const container = createQRCodeContainer();
  const qrSize = 256;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(url)}`;

  container.innerHTML = `
    <div id="qr-code" style="width:${qrSize}px;height:${qrSize}px;position:relative;">
      <img src="${qrUrl}" alt="QR Code" style="width:100%;height:100%;">
      <img src="${favicon}" alt="Favicon" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;">
    </div>
    <div style="text-align:center;margin-top:24px;">
      <strong style="display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:${qrSize}px;">${document.domain}</strong>
      <span style="display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:${qrSize}px;margin-top:4px;">${title}</span>
    </div>
  `;

  logoButton.addEventListener('click', toggleQRCode);
  container.addEventListener('click', toggleQRCode);
}

function toggleQRCode() {
  const container = document.getElementById('qr-code-container');
  const logoButton = document.getElementById('qr-code-logo-button');
  
  if (qrCodeVisible) {
    container.style.display = 'none';
    logoButton.style.display = 'block';
  } else {
    container.style.display = 'block';
    logoButton.style.display = 'block';
  }
  
  qrCodeVisible = !qrCodeVisible;
}

// Get page information and generate QR code
const url = window.location.href;
const title = document.title;
const favicon = document.querySelector('link[rel*="icon"]')?.href || '/favicon.ico';

generateQRCode(url, title, favicon);