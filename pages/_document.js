import Document, { Html, Head, Main, NextScript } from "next/document";
// Head 只能用在這個file + component 裏面
// 這個file 是要改動 default document

class MyDoc extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          {/* 在這邊加東西，可以在application component 以外的地方加東西 */}
          {/* 像是用react portal 把modal 拉到這邊來顯示 */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDoc;
