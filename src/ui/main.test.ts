import "./main"
import fs from 'fs'

describe("ui", () => {
  const domParser = new DOMParser()
  const html = fs.readFileSync("src/ui/index.html", "utf8")

  beforeEach(() => {
    window.document.body = domParser.parseFromString(html, "text/html").body
  })

  it("updates html on message received", async () => {
    window.dispatchEvent(new MessageEvent("message", {
       data: { 
          source: "qatium",
          type: "message",
          payload: 5
        }
      })
    )

    expect(window.document.body.querySelector("#valves")?.innerHTML).toBe("5")
  })
})