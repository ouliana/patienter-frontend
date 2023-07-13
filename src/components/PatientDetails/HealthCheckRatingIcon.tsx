import { HealthCheckRating } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, amber, deepOrange, pink } from '@mui/material/colors';

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0:
      return (
        <FavoriteIcon
          sx={{
            color: green[500],
            marginTop: '1rem',
          }}
        />
      );
    case 1:
      return (
        <FavoriteIcon
          sx={{
            color: amber[500],
            marginTop: '1rem',
          }}
        />
      );
    case 2:
      return (
        <FavoriteIcon
          sx={{
            color: deepOrange[500],
            marginTop: '1rem',
          }}
        />
      );
    case 3:
      return (
        <FavoriteIcon
          sx={{
            color: pink[500],
            marginTop: '1rem',
          }}
        />
      );
    default:
      return null;
  }
};

export default HealthCheckRatingIcon;
