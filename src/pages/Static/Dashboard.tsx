import Container from '@mui/material/Container';
import SEO from '../../seo/Seo';
import { PAGE } from '../../seo/seo.constant';

const Dashboard = () =>{
  return (
    <Container>
      <SEO title={PAGE.defaultPage.title} description={PAGE.defaultPage.description} />
      <div>dashboard page</div>
    </Container>
  )
}

export  {Dashboard};