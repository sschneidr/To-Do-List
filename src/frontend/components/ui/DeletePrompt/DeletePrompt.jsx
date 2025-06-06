import { useCallback, useState } from "react";

import { DeleteIcon } from "../../../common";

import "./DeletePrompt.css";

export default function DeletePrompt({ element, mutation }) {
  const [isVisible, setIsVisible] = useState(false);

  const deleteElement = useCallback(() => {
    mutation.mutate();
  }, [element, mutation]);

  const hidePrompt = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showPrompt = useCallback(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <DeleteIcon onClick={showPrompt} className="delete-button" />
      {isVisible && (
        <>
          <div id="overlay"></div>
          <div className="delete-prompt window">
            <div className="delete-prompt__text">
              <p>
                Do you want to delete&nbsp;
                <span className="delete-prompt__element">{element}</span>?
              </p>
            </div>
            <div className="delete-prompt__buttons">
              <button onClick={deleteElement}>Yes</button>
              <button onClick={hidePrompt}>No</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
