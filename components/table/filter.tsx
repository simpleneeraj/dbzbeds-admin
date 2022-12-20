import Image from "next/image";
import css from "styles/order.module.scss";

interface FilterHeaderProps {
  createText?: string;
  onCreate?: () => void;
}
const FilterHeader = ({ onCreate, createText }: FilterHeaderProps) => {
  return (
    <div className={css.subsubsubactionbtnlist}>
      <div className={css.findactionbtn}>
        <div className={css.selectcategory}>
          <select name="category" id="">
            <option value="All category">All category</option>
            <option value="All category">All category</option>
            <option value="All category">All category</option>
          </select>
        </div>
        <div className={css.selectcategory}>
          <select name="category" id="">
            <option value="All category">Active</option>
            <option value="All category">Archived</option>
            <option value="All category">Disabled</option>
          </select>
        </div>
        <div className={css.searchlistproduct}>
          <div className={css.box}>
            <input type="text" placeholder="Search Product" />
            <button>
              <Image
                src="/icons/search-line.svg"
                alt="search"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
      {createText && (
        <div className={css.actionbtnlist}>
          <a onClick={onCreate} className={css.cpbtn}>
            {createText}
          </a>
        </div>
      )}
    </div>
  );
};

export default FilterHeader;
