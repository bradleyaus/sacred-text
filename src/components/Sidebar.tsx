import {
  FaBirthdayCake,
  FaHome,
  FaPlusCircle,
  FaParagraph,
} from 'react-icons/fa';
export function Sidebar() {
  return (
    <div className="h-full font-mono absolute top-0 left-0 w-60 pt-10 bg-celdon shadow-md">
      <div className="grid grid-cols-1 place-items-center">
        <div className="join-item">
          <FaBirthdayCake size="40" />
        </div>
        <h1 className="text-2xl text-center font-extrabold pt-2">SacredText</h1>
        <ul className="menu w-56 rounded-box mt-8 pl-5">
          <li>
            <a href="/">
              <FaHome size="18" className="mr-5" />
              Home
            </a>
          </li>
          <li>
            <a href="/recipe/add">
              <FaPlusCircle size="18" className="mr-5" />
              Add a Recipe
            </a>
          </li>
          <li>
            <a>
              <FaParagraph size="18" className="mr-5" />
              View Recipes
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
