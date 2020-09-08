(() => {
  const finishTime = performance.now();
  const div = document.createElement('div');
  div.appendChild(document.createTextNode((finishTime - startTime) + ' ms'));
  document.body.appendChild(div);
})();