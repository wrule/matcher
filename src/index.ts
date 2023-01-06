
const regex = `function main ( ) { }`;

const doc = `
function main() {

}
`;

function
match_pop(doc: string, matcher: string | RegExp) {
  if (matcher instanceof RegExp || matcher.startsWith('^')) {
    const regex = new RegExp(matcher);
    const result = regex.exec(doc);
    if (result) return { matcher, result: result[0], next: doc.slice(result[0].length) };
  } else if (doc.startsWith(matcher))
    return { matcher, result: matcher, next: doc.slice(matcher.length) };
  throw { doc, matcher };
}

function parse(pattern: string, doc: string) {
  const result: [string | RegExp, string][] = [];
  const matchers = pattern.split(/\s+/);
  doc = match_pop(doc, /\s*/).next;
  matchers.forEach((matcher) => {
    console.log(matcher);
  });
  return result;
}

function main() {
  parse(regex, doc);
}

main();