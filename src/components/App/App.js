import React, { Component } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Nav from "components/Nav";
import List from "components/List";
import Grid from "components/Grid";
import Loader from "components/Loader";
import { layouts, themes } from "store/app/utils";
import { colorsDark, colorsLight } from "styles/palette";

import { Wrapper, Title, TitleWrapper, SocialLink } from "./styles";

class App extends Component {
  static defaultProps = {
    stories: [],
  };

  static propTypes = {
    layout: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    stories: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    storyIds: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasMoreStores: PropTypes.bool.isRequired,
    fetchStories: PropTypes.func.isRequired,
    fetchStoriesFirstPage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchStoriesFirstPage();
    this.setBodyBackgroundColor();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.setBodyBackgroundColor();
    }
  }

  setBodyBackgroundColor() {
    if (this.props.theme === themes.light) {
      document.body.style = `background-color: ${colorsLight.background};`;
    } else {
      document.body.style = `background-color: ${colorsDark.background};`;
    }
  }

  fetchStories = () => {
    const { storyIds, page, fetchStories, isFetching } = this.props;
    if (!isFetching) {
      fetchStories({ storyIds, page });
    }
  };

  render() {
    const { stories, layout, theme, hasMoreStores } = this.props;
    return (
      <ThemeProvider theme={theme === themes.light ? colorsLight : colorsDark}>
        <div>
          <Nav />
          <Wrapper>
            <TitleWrapper>
              <Title>
                <div>{"Hacker News Reader"}</div>
                <SocialLink href="https://asiwaju.now.sh" target="blank">
                  <i className="fab fa-github" />
                </SocialLink>
                {/* <GithubLink
                  href="https://github.com/AsiwajuDev/hacker-news-clone"
                  target="_blank"
                >
                  (build your own)
                </GithubLink> */}
              </Title>
              <div>
                <SocialLink
                  href="https://twitter.com/@_asiwaju07"
                  target="blank"
                >
                  <i className="fab fa-twitter" />
                </SocialLink>
                <SocialLink href="https://blog.asiwaju.now.sh" target="blank">
                  <i className="fab fa-slack-hash" />
                </SocialLink>
                <SocialLink href="https://medium.com/@asiwaju" target="blank">
                  <i className="fab fa-medium-m" />
                </SocialLink>

                <SocialLink href="https://asiwaju.now.sh" target="blank">
                  <i className="fas fa-link" />
                </SocialLink>
              </div>
            </TitleWrapper>
            <InfiniteScroll
              dataLength={stories.length}
              next={this.fetchStories}
              hasMore={hasMoreStores}
              loader={<Loader />}
              style={{
                height: "100%",
                overflow: "visible",
              }}
            >
              {layout === layouts.list ? (
                <List stories={stories} />
              ) : (
                <Grid stories={stories} />
              )}
            </InfiniteScroll>
          </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
