const path = require('path');
const fs = require('fs');
const os = require('os');
const unzipper = require('unzipper');
const rimraf = require('rimraf');
const ws = fs.createReadStream(path.join(__dirname, 'lib.zip'))
  .pipe(unzipper.Extract({
    path: __dirname,
  }));

ws.on('close', () => {
  rimraf(path.join(__dirname, 'lib.zip'), err => {
    if (err) {
      throw err;
    }
  });
  const platform = os.platform();
  switch (platform) {
    case 'win32': {
      ['macos', 'linux'].forEach(p => {
        rimraf(path.join(__dirname, 'lib', p), err => {
          if (err) {
            throw err;
          }
        });
      });
      break;
    }
    case 'darwin': {
      ['win', 'linux'].forEach(p => {
        rimraf(path.join(__dirname, 'lib', p), err => {
          if (err) {
            throw err;
          }
        });
      });
      break;
    }
    case 'linux': {
      ['win', 'macos'].forEach(p => {
        rimraf(path.join(__dirname, 'lib', p), err => {
          if (err) {
            throw err;
          }
        });
      });
      break;
    }
    default: throw new Error('unknown platform: ' + platform);
  }
});

process.on('uncaughtException', err => {
  console.warn(err.stack);
});
