import { exception } from "console"

function parseTitle(title: string): [string, string?, string?] {
  const chunks = title.split(':', 3)

  if (chunks.length == 1) return [chunks[0]]
  else if (chunks.length == 3) return [chunks[0], chunks[1], chunks[2]]
  else throw exception()
}

export default parseTitle;
