const https = require('https');

const token = 's';
const fileId = 'qFHNFlPwBqQul0GtnrdSun';
const nodeId = '0:1';

const options = {
  hostname: 'api.figma.com',
  path: `/v1/files/${fileId}`,
  method: 'GET',
  headers: {
    'X-Figma-Token': token
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      require('fs').writeFileSync('figma_data.json', JSON.stringify(json, null, 2), 'utf-8');
      console.log('Saved to figma_data.json');
    } catch (e) {
      console.log('Error parsing JSON:', e);
      console.log('Raw data:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.end();
