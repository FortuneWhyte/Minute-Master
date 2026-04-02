const fs = require('fs');
const PDFParser = require('pdf2json');

function extract(file) {
    const pdfParser = new PDFParser(this, 1);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFileSync(file + '.txt', pdfParser.getRawTextContent());
        console.log("Done", file);
    });
    pdfParser.loadPDF(file);
}

extract('./minutes_template/HAULTAIN CROSSING CONDOMINIUM CORPORATION MEETIN MINUTES.pdf');
extract('./minutes_template/MEDFORD MEWS PHASE 3 MEETING MINUTES II.pdf');
