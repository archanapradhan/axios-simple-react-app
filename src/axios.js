import axios from "axios";

// an axios object, we can create multiple as per our requirement
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

instance.defaults.headers.common["Authentication"] = "AUTH TOKEN FROM INSTANCE";
//when instance is used ,the above code will override the same settings done in index.js file

export default instance;
