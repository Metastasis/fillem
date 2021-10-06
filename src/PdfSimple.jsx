import React, {useMemo, useState, useRef} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// https://gist.github.com/wojtekmaj/f265f55e89ccb4ce70fbd2f8c7b1d95d
function highlightPattern(text, pattern) {
  const splitText = text.split(pattern);
  if (splitText.length <= 1) {
    return text;
  }
  const matches = text.match(pattern);
  return splitText.reduce((arr, element, index) => (matches[index] ? [
    ...arr,
    element,
    <mark key={index}>
      {matches[index]}
    </mark>,
  ] : [...arr, element]), []);
}

export default function Test(props) {
  const file = {url: props.file};
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const inputs = useRef(null);
  const textRenderer = useMemo((textItem = {str: ''}) => {
    return highlightPattern(textItem.str, searchText);
  }, [searchText]);
  function onChange(event) {
    setSearchText(event.target.value);
  }
  function onDocumentLoadSuccess(pdf) {
    setNumPages(pdf.numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  function previousPage() {
    changePage(-1);
  }
  function nextPage() {
    changePage(1);
  }
  console.log(inputs.current);
  return (
    <>
      <Document
        key={file.url}
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="svg"
      >
        <Page
          pageNumber={pageNumber}
          renderInteractiveForms={true}
          inputRef={inputs}
        />
      </Document>
      <div>
        <label htmlFor="search">Search:</label>
        <input type="search" id="search" value={searchText} onChange={onChange} />
      </div>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
