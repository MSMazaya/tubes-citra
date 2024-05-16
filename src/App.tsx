import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function App() {
  const [file, setFile] = useState(null);
  const [transition, setTransition] = useState(0);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
      setTransition(1);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/*'
  });

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }

    // Dummy request function
    try {
      await dummyUploadRequest(file, fileName, isDone);
      alert("File uploaded successfully!");
      setTransition(0);
    } catch (error) {
      alert("File upload failed!");
    }
  };

  return (
    <div className="container">
      <h1>GUI Tugas Besar Citra</h1>
      {transition == 0 && <>
        <Dropzone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />
        <p>Atau</p>
        <button onClick={() => {
          setTransition(2)
          console.log("HEY")
        }} style={{ maxWidth: "250px", margin: "0 auto" }}>
          Cek Data!
        </button>
      </>}
      {transition == 1 && <div
      >
        <FileDetails fileName={fileName} isDone={isDone} setIsDone={setIsDone} setDescription={setDescription} description={description} />
        <UploadButton handleUpload={handleUpload} />
      </div>}
      {transition == 2 &&
        <div style={{
          width: "70vw",
          minWidth: "250px",
          margin: "0 auto"
        }}>
          <Graph transition={() => setTransition(0)} />
        </div>
      }
    </div>
  );
}

function Dropzone({ getRootProps, getInputProps, isDragActive }) {
  return (
    <div
      {...getRootProps()}
      style={{
        width: "50vw",
        minWidth: "250px",
        border: "2px dashed gray",
        padding: "20px",
        textAlign: "center",
        marginBottom: "20px",
        margin: "0 auto",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop foto disini...</p>
      ) : (
        <p>Drop atau klik untuk unggah foto</p>
      )}
    </div>
  );
}

function FileDetails({ fileName, isDone, setIsDone, setDescription, description }) {
  return (
    <form
      className="file-details-form"
      style={{
        "width": "50vw",
        "minWidth": "250px",
        "display": "flex",
        "flexDirection": "column",
        "gap": "1rem",
        "margin": "0 auto",
      }}
    >
      <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        Nama file:
        <input type="text" value={fileName} readOnly style={{ flex: 1 }} />
      </label>
      <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        Deskripsi:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{ flex: 1 }} />
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        Selesai pemakaian:
        <input type="checkbox" checked={isDone} onChange={(e) => setIsDone(e.target.checked)} />
      </label>
    </form>
  );
}

function UploadButton({ handleUpload }) {
  return (
    <button onClick={handleUpload} style={{ marginTop: "20px" }}>
      Upload
    </button>
  );
}

async function dummyUploadRequest(file, fileName, isDone) {
  // Simulate a request to an unknown API
  console.log()
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log("File uploaded:", file, fileName, isDone);
  //     resolve({ success: true });
  //   }, 1000);
  // });
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Perbandingan hasil data',
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: 'Tanpa produk',
      data: labels.map((e, i) => i * 2),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dengan produk',
      data: labels.map((e, i) => i),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Graph({ transition }) {
  return <div>
    <Line style={{ width: "100%", height: "100%" }} options={options} data={data} />
    <button onClick={transition} style={{ maxWidth: "500px", margin: "0 auto" }}>
      Kembali ke menu awal
    </button>
  </div>
}

export default App;
