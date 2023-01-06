
const regex = `function $id ( ) { }`;

const doc = `
function main() {
  console.log('你好，世界');
}
`;

function match_pop(matcher: string | RegExp, doc: string) {
  if (matcher instanceof RegExp || matcher.startsWith('^')) {
    const regex = new RegExp(matcher);
    const result = regex.exec(doc);
    if (result) return [matcher, result[0], doc.slice(result[0].length)];
    return null;
  } else {
    if (doc.startsWith(matcher)) return [matcher, matcher, doc.slice(matcher.length)];
    return null;
  }
}

function parse(pattern: string, doc: string) {
  const matchers = pattern.split(/\s+/);
  console.log(match_pop(`function main()`, doc));
}

function main() {
  // parse(regex, doc);
  // console.log('123' instanceof RegExp);
}

main();