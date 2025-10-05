import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rate,size="default",className }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rate >= i) {
      stars.push(<FaStar key={i} className={`text-yellow-400  ${size=="large"?"text-2xl":"text-sm"} ${className}`} />);
    } else if (rate >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className={`text-yellow-400  ${size=="large"?"text-2xl":"text-sm "} ${className}`} />);
    } else {
      stars.push(<FaRegStar key={i} className={`text-yellow-400 ${size=="large"?"text-2xl":"text-sm "} ${className}`} />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;