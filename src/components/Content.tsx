import StyledDiv from './Content.styled';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Container;
