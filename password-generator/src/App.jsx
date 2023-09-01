import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numb, setNumb] = useState(false);
  const [char, setChar] = useState(false);
  const [length, setLength] = useState(8);

  const passwordRef = useRef(null);

  const GenPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numb) str += "0123456789";
    if (char) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character);
    }

    setPassword(pass);
  }, [length, char, numb, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => GenPassword(), [length, char, numb, GenPassword]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl mb-10 underline text-center">
          Hello! Get your secure password here
        </h1>
        <div className="w-full max-w-md mx-auto rounded-xl bg-white text-black shadow-md p-6">
          <div className="flex rounded-lg overflow-hidden mb-4 shadow">
            <input
              type="text"
              value={password}
              className="w-full py-2 px-3 outline-none"
              placeholder="Password"
              ref={passwordRef}
              readOnly
            />
            <button
              className="bg-purple-500 text-white px-3 py-2 rounded-l-none outline-none hover:bg-purple-600"
              onClick={copyPassword}
            >
              COPY
            </button>
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="flex items-center">
              <input
                type="range"
                value={length}
                min={8}
                max={20}
                onChange={(e) => setLength(e.target.value)}
                className="w-32 cursor-pointer"
              />
              <label className="ml-2">Length: {length}</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={char}
                onChange={() => setChar((prev) => !prev)}
                className="cursor-pointer"
              />
              <label className="ml-2">Add Characters</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={numb}
                onChange={() => setNumb((prev) => !prev)}
                className="cursor-pointer"
              />
              <label className="ml-2">Add Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
