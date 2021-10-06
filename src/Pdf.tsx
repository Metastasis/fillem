import React from 'react';

interface PdfBackend {
  init: (source: any, element: HTMLElement) => void
}

export class PDFJs implements PdfBackend {
  init = (source: any, element: HTMLElement) => {
    const textNode = document.createElement('p');
    textNode.innerHTML = `Our PDF source will be: ${source}`;

    element.appendChild(textNode);
  }
}

interface Props {
  backend: PdfBackend,
  src: string,
}

export default class PDFViewer extends React.Component<Props> {
  static defaultProps = {
    backend: PDFJs,
  }

  viewerRef: any;
  backend: PdfBackend;

  constructor(props: any) {
    super(props);
    const PdfBackend = props.backend;
    this.viewerRef = React.createRef();
    this.backend = new PdfBackend();
  }

  componentDidMount() {
    this.backend.init(this.props.src, this.viewerRef.current)
  }

  render() {
    return (
      <div ref={this.viewerRef} id='viewer' style={{ width: '100%', height: '100%' }}>
        Hello world!
      </div>
    )
  }
}
