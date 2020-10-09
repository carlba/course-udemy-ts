({
  plugins: ['jsdom-quokka-plugin'],
  jsdom: { html: `<div id="test">Hello</div>` }
});

console.log(document.querySelector('body')?.innerHTML);
