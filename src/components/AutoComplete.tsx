import { useState } from "react";

const AutoComplete = ({ data }: any) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionActive, setSuggestionActive] = useState(false);
  const [value, setValue] = useState("");
  console.log(data);
  
  // Monitor changes of input field and filter the data to find relevant suggestions
  const handleChange = (e: any) => {
    setValue(e.target.value);
    const query = e.target.value;
    console.log(query);
    setValue(query);
    
    if (query.length > 1) {
      const filteredSuggestions = data.filter(
        (suggestion: any) => suggestion.name.toLowerCase().indexOf(query) > -1 // if suggestion contains query
      );
      setSuggestions(filteredSuggestions);
      console.log(filteredSuggestions);
      setSuggestionActive(true);
    } else {
      setSuggestionActive(false);
    }
  };

  // Allow user to click a suggestion to select it
  const handleClick = (e: any) => {
    setSuggestions([]); // clear suggestions
    setValue(e.target.innerText); // set value to clicked suggestion
    setSuggestionActive(false); // deactivate suggestions
  };

  // Allow user to navigate through suggestions
  const handleKeyDown = (e: any) => {
    // Up arrow
    if (e.keyCode === 38) {
      if (suggestionIndex > 0) {
        setSuggestionIndex(suggestionIndex - 1);
      }
    } else if (e.keyCode === 40) {
      // Down arrow
      if (suggestionIndex < suggestions.length - 1) {
        setSuggestionIndex(suggestionIndex + 1);
      }
    } else if (e.keyCode === 13) {
      // Enter
      if (suggestions.length > 0) {
        setValue(suggestions[suggestionIndex]);
        setSuggestionIndex(0);
        setSuggestionActive(false);
      }
    }
  };

  // Suggestions component
  const Suggestions = () => {
    return (
      <ul>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <input
        className="text-black"
        placeholder="Search for a poke"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionActive && <Suggestions />}
    </div>
  );
};

export default AutoComplete;
