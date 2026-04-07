type TableCell = string | number | ImageContent | StackContent;

interface ImageContent {
  image: string;
  width?: number;
  margin?: number[];
}

interface StackContent {
  stack: (string | ImageContent)[];
}

interface TableDefinition {
  headerRows?: number;
  widths?: (string | number)[];
  body: TableCell[][];
}

interface TextContent {
  text: string;
  fontSize?: number;
  bold?: boolean;
  margin?: number[];
}

interface TableContent {
  table: TableDefinition;
}

type Content = TextContent | TableContent;

interface DocDefinition {
  content: Content[];
  defaultStyle?: {
    fontSize?: number;
  };
}

declare module "pdfmake/build/pdfmake" {
  const pdfMake: {
    createPdf: (docDefinition: DocDefinition) => {
      download: (filename?: string) => void;
    };
    vfs: Record<string, string>;
  };

  export default pdfMake;
}

declare module "pdfmake/build/vfs_fonts" {
  const fonts: {
    pdfMake?: { vfs: Record<string, string> };
    vfs?: Record<string, string>;
  };

  export default fonts;
}