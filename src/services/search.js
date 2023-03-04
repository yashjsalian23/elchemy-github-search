// import { useAPIcall } from "../components/customHooks/useRequest";

// const URLs = {
//   searchResults: `https://api.github.com/search/repositories`,
// };

// module.exports.searchRepos = async (query, page) => {
//   let url = new URL(URLs.searchResults);
//   if (query && query.length) {
//     url.searchParams.append("query", query);
//   }

//   if (page) {
//     url.searchParams.append("page", page);
//   }
//   let response = await useAPIcall(url.href, "get");
//   return response.data;
// };
