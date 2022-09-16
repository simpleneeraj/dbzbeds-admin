import css from "styles/order.module.scss";

interface TableHeaderProps {
  listArray: {
    name: string;
  }[];
}

const TableHeader = ({ listArray }: TableHeaderProps) => {
  return (
    <tr>
      <th>
        <div className={css.topcheckbox}>
          <div className={css.checkbox}>
            <input type="checkbox" />
          </div>
        </div>
      </th>
      {listArray.map(({ name }, i) => (
        <th key={i}>{name}</th>
      ))}
    </tr>
  );
};

export default TableHeader;
