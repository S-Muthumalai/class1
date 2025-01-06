import { useState } from "react";
export const QrGenerator = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrSize, setQrSize] = useState(150);
    const [qrData, setQrData] = useState("Master-Coder");
    const downloadQR = () => {
        
            fetch(img).then((res) => res.blob()).then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "QR code";
            a.click();
            document.body.removeChild(a);
        }).catch((error)=>{
            console.error("Error downloading QR code",error);
        })
    };
    async function generateQR() {
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }catch(error){
            console.error("Error generating QR code",error); 
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="App_container">
        <h1>QR code Generator</h1>
        {loading && <p>please wait...</p>}
        {img && <img src={img} className="qr-code-image"/>}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for Qr code :
            </label>
            <input type="text" id="dataInput" value={qrData} placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)}/>
            <label htmlFor="sizeInput" className="input-label">
                Image size (e.g., 150):
            </label>
            <input type="text" id="sizeInput" value={qrSize} placeholder="Enter image size" onChange={(e)=>setQrSize(e.target.value)} />
            <div className="button-container">
            <button className="generate-button" disabled={loading} onClick={generateQR}>
                Generate QR code
            </button>
            <button className="download-button"  onClick={downloadQR}>
                Download QR code
            </button>
            </div>
        </div>
        <p className="describtion">
            Designed By <a href="https://google.com">Master-Coder</a>
        </p>
    </div>
  );
};