import StyledDiv from './Container.styled';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Container;
