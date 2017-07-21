
self.addEventListener('securitypolicyviolation', () => {
  console.log('securitypolicyviolation event in worker');
});

fetch('http://horo-t.github.io/');
