context("Test File Uploads", () => {
  const files = [
    ["png", "file_example_PNG_500KB.png"],
    ["jpg", "file_example_JPG_100KB.jpg"],
    ["gif", "file_example_GIF_500kB.gif"],
    ["tiff", "file_example_TIFF_1MB.tiff"],
    ["pdf", "file-sample_150kB.pdf"],
    ["svg", "file_example_SVG_20kB.svg"],
    ["xls", "file_example_XLS_10.xls"],
    ["doc", "file-sample_100kB.doc"],
    ["docx", "file-sample_100kB.docx"],
    ["mp3", "file_example_MP3_700KB.mp3"],
    ["json", "example.json"],
    ["csv", "addresses.csv"]
    // ["js", ""],
    // ["coffee", ""],
    // ["html", ""],
    // ["txt", ""],
    // ["tif", ""],
    // ["zip", ""],
    // ["xlsx", ""],
  ];
  beforeEach(() => {
    cy.visit("/");
  });

  files.forEach(file => {
    it(`should be able to upload a .${file[0]} file`, () => {
      cy.intercept(`/upload-${file[0]}`).as(`${file[0]}`);
      cy.get("input").attachFile(`${file[1]}`);
      cy.get("button").click();
      cy.wait(`@${file[0]}`).then((interception) => {
        expect(interception.response.body).to.equal('Done!');
      })
      cy.get("span").should("have.text", "SUCCESS");
    });
  });
});
