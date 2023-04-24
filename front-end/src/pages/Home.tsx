import axios from "axios";
import { useState } from "react";
import { Card } from "./HomeStyled";
import { log } from "console";

export function Home() {
  const [password, setPassword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const API_URL = process.env.VITE_APP_BACK_END_URL;
  console.log(API_URL);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  async function generatePassword() {
    try {
      const { data } = await axios.post(`${API_URL}/generate-password`, {
        length: inputValue,
      });
      setPassword(data.password);
    } catch (err: any) {
      switch (err.response.status) {
        case 422:
          alert(err.response.data.error);
          break;
        case 500:
          alert(err.response.data);
          break;
        default:
          alert("Unknown error");
      }
    }
  }

  return (
    <Card>
      <h1>Careful Password Generator</h1>
      <div>
        <input
          type="number"
          id="tamanho"
          name="tamanho"
          placeholder="Enter password length very very carefully"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={generatePassword}>Generate</button>
      </div>

      <h2>{password}</h2>
    </Card>
  );
}
