import p2_img from "./book_img_the catcher_in_rye.jpg";
import p5_img from "./book_non_mans_Search_for_meaning.jpg";
import p3_img from "./book_other_baghdad.jpeg";
import p4_img from "./book_non_how_to_win_friends.jpg";

let data_product = [
  {
    id: 1,
    name: "Book_2",
    image: p2_img,
    pdf: "https://giove.isti.cnr.it/demo/eread/Libri/sad/Rye.pdf",
  },
  {
    id: 2,
    name: "Book_4",
    image: p4_img,
    pdf: "https://www.rfpmm.org/pdf/how-to-win-friends-and-influence-people.pdf",
  },
  {
    id: 3,
    name: "Book_3",
    image: p3_img,
    pdf: "https://www.dlshq.org/download2/bgita.pdf",
  },
  {
    id: 4,
    name: "Book_5",
    image: p5_img,
    pdf: "https://antilogicalism.com/wp-content/uploads/2017/07/mans-search-for-meaning.pdf",
  },
];
const handleItemClick = (item) => {
  if (item.pdf) {
    window.open(item.pdf, "_blank");
  }
};

data_product.map((item) => ({
  ...item,
  onClick: () => handleItemClick(item),
}));

export default data_product;
