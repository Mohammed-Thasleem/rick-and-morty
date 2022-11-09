import { Link } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;

const CharacterCard = ({ character }) => {
  return (
    <Link to={character.id} key={character.id}>
      <Card
        className="card"
        hoverable
        style={{
          width: 300,
        }}
        cover={<img alt={character.name} src={character.image} />}
      >
        <Meta title={`Name : ${character.name}`} />
        <br />
        <p>{`Gender : ${character.gender}`}</p>
        <p>{`Status : ${character.status}`}</p>
        <p>{`Species : ${character.species}`}</p>
      </Card>
    </Link>
  );
};

export default CharacterCard;
