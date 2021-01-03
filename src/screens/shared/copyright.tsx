import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://sahaj.ai/">
        Sahaj
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
