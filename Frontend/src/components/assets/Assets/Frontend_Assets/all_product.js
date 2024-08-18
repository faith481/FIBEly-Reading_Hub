import b1_img from "./book_img_to_kill_a_mocking_bird.jpeg";
import b2_img from "./book_img_1984.jpeg";
import b3_img from "./book_img_the_godfather.jpg";
import b4_img from "./book_img_Things-Fall-Apart_709d5448-8bc3-428b-a2e5-571675442f6d_948x.jpg";
import b5_img from "./book_img_the_Hobbit.jpeg";
import b6_img from "./book_img_pride_prejudice.jpg";
import b7_img from "./book_img_lord_of_the_rings.jpg";
import b8_img from "./book_img_animal_farm.jpg";
import b9_img from "./book_img_advernture.jpeg";
import b10_img from "./book_img_the catcher_in_rye.jpg";
import b11_img from "./book_img_little_prince.jpeg";
import b12_img from "./book_img_ferhenite_451.png";
import b13_img from "./book_non_hghly_effective.jpg";
import b14_img from "./book_img_atomic_habits.jpg";
import b15_img from "./book_non_how_to_win_friends.jpg";
import b16_img from "./book_non_power_of_now.jpg";
import b17_img from "./book_non_the subtle_art.jpeg";
import b18_img from "./book_non_think_fast_slow.jpg";
import b19_img from "./book_non_brief_history.jpg";
import b20_img from "./book_non_4-hour_workweek.jpeg";
import b21_img from "./book_non_the_art_of_war.jpg";
import b22_img from "./book_non_mans_Search_for_meaning.jpg";
import b23_img from "./book_img_rich_dad_poor_dad.jpeg";
import b24_img from "./book_non_alchemist.jpeg";
import b25_img from "./book_other_complete_work_of_shakespere.jpg";
import b26_img from "./book_other_holy_bible.jpeg";
import b27_img from "./book_other_quran.jpeg";
import b28_img from "./book_other_baghdad.jpeg";
import b29_img from "./book_other_tao_ching.jpg";
import b30_img from "./book_other_art_of_happiness.jpeg";
import b31_img from "./book_other_book_of_joy.jpg";
import b32_img from "./book_other_mans_ eternal_quest.jpeg";
import b33_img from "./book_other_the_prophet.jpg";
import b34_img from "./book_other_unethered_soul.jpg";
let all_books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "fiction",
    image: b1_img,
    new_price: 15.99,
    old_price: 39.99,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "fiction",
    image: b2_img,
    new_price: 12.99,
    old_price: 25.99,
  },

  {
    id: 3,
    title: "The God Father",
    author: "Mario Puzo",
    category: "fiction",
    image: b3_img,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    category: "fiction",
    image: b4_img,
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "fiction",
    image: b5_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "fiction",
    image: b6_img,
    new_price: 85.0,
    old_price: 120.5,
  },

  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "fiction",
    image: b7_img,
    new_price: 24.99,
    old_price: 55.99,
  },
  {
    id: 8,
    title: "Animal Farm",
    author: "George Orwell",
    category: "fiction",
    image: b8_img,
    new_price: 11.99,
    old_price: 22,
  },

  {
    id: 9,
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    category: "fiction",
    image: b9_img,
    new_price: 12.99,
    old_price: 33,
  },

  {
    id: 10,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "fiction",
    image: b10_img,
    new_price: 13.99,
    old_price: 17,
  },

  {
    id: 11,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "fiction",
    image: b11_img,
    new_price: 10.99,
    old_price: 22,
  },
  {
    id: 12,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    category: "fiction",
    image: b12_img,
    new_price: 12.99,
    old_price: 22,
  },

  {
    id: 13,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    category: "non-fiction",
    image: b13_img,
    new_price: 15.99,
    old_price: 19,
  },
  {
    id: 14,
    title: "Atomic Habits",
    author: "James Clear",
    category: "non-fiction",
    image: b14_img,
    new_price: 14.99,
    old_price: 20,
  },
  {
    id: 15,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "non-fiction",
    image: b15_img,
    new_price: 12.99,
    old_price: 16,
  },
  {
    id: 16,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "non-fiction",
    image: b16_img,
    new_price: 13.99,
    old_price: 17,
  },
  {
    id: 17,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "non-fiction",
    image: b17_img,
    new_price: 16.99,
    old_price: 17.99,
  },
  {
    id: 18,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "non-fiction",
    image: b18_img,
    new_price: 18.99,
    old_price: 20,
  },
  {
    id: 19,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "non-fiction",
    image: b19_img,
    new_price: 24.99,
    old_price: 28,
  },
  {
    id: 20,
    title: "The 4-Hour Workweek",
    author: "Timothy Ferriss",
    category: "non-fiction",
    image: b20_img,
    new_price: 19.99,
    old_price: 29.5,
  },
  {
    id: 21,
    title: "The Art of War",
    author: "Sun Tzu",
    category: "non-fiction",
    image: b21_img,
    new_price: 11.99,
    old_price: 13,
  },
  {
    id: 22,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "non-fiction",
    image: b22_img,
    new_price: 12.99,
    old_price: 22.99,
  },
  {
    id: 23,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "non-fiction",
    image: b23_img,
    new_price: 14.99,
    old_price: 18.99,
  },
  {
    id: 24,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "non-fiction",
    image: b24_img,
    new_price: 10.99,
    old_price: 14.99,
  },
  {
    id: 25,
    title: "The Complete Works of William Shakespeare",
    author: "William Shakespeare",
    category: "classics",
    image: b25_img,
    new_price: 29.99,
    old_price: 33,
  },
  {
    id: 26,
    title: "The Holy Bible",
    author: "Various",
    category: "religion",
    image: b26_img,
    new_price: 15.99,
    old_price: 35,
  },
  {
    id: 27,
    title: "The Quran",
    author: "Various",
    category: "religion",
    image: b27_img,
    new_price: 12.99,
    old_price: 36,
  },
  {
    id: 28,
    title: "The Bhagavad Gita",
    author: "Various",
    category: "spirituality",
    image: b28_img,
    new_price: 10.99,
    old_price: 12,
  },
  {
    id: 29,
    title: "The Tao Te Ching",
    author: "Lao Tzu",
    category: "philosophy",
    image: b29_img,
    new_price: 11.99,
    old_price: 22,
  },
  {
    id: 30,
    title: "The Art of Happiness",
    author: "Dalai Lama and Howard C. Cutler",
    category: "self-help",
    image: b30_img,
    new_price: 14.99,
    old_price: 16.99,
  },
  {
    id: 31,
    title: "The Book of Joy: Lasting Happiness in a Changing World",
    author: "Dalai Lama, Desmond Tutu, and Douglas Abrams",
    category: "self-help",
    image: b31_img,
    new_price: 16.99,
    old_price: 18.99,
  },
  {
    id: 32,
    title: "Man's Eternal Quest",
    author: "Paramahansa Yogananda",
    category: "spirituality",
    image: b32_img,
    new_price: 12.99,
    old_price: 34,
  },
  {
    id: 33,
    title: "The Prophet",
    author: "Kahlil Gibran",
    category: "poetry",
    image: b33_img,
    new_price: 9.99,
    old_price: 10.99,
  },
  {
    id: 34,
    title: "The Untethered Soul: The Journey Beyond Yourself",
    author: "Michael A. Singer",
    category: "spirituality",
    image: b34_img,
    new_price: 15.99,
    old_price: 18.5,
  },
];

export default all_books;
