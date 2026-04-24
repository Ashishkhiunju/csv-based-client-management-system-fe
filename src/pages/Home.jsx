import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClients } from "../store/clientSlice";
import appConfig from "../config/appConfig";

function Home() {
  const dispatch = useDispatch();
  const { data, currentPage, lastPage } = useSelector(
    (state) => state.clients
  );

  const baseUrl = appConfig.baseURL; // 👈 using config

  const token = useSelector((state) => state.auth.token);

  const fetchClients = async (page = 1) => {
    const res = await fetch(
      `${baseUrl}/api/clients?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 important
        },
      }
    );

    const result = await res.json();
    dispatch(setClients(result));
  };
 // 👈 using config

  const handleDirectLogin = async () => {
        window.open(`${baseUrl}`, "_blank");
};

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    
    <div style={{ padding: "30px" }}>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
            <button onClick={handleDirectLogin} style={styles.bigButton}>
                Login to Laravel Dashboard
            </button>
        </div>
      <h2>Client Management</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {data.map((client) => (
            <tr key={client.id}>
              <td>{client.company_name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => fetchClients(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {lastPage}
        </span>

        <button
          disabled={currentPage === lastPage}
          onClick={() =>{     console.log("Next clicked", currentPage);fetchClients(currentPage + 1)}}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};

export default Home;