import { ISankeyLink } from "../components/SankeyChart/SankeyChart";

const isLinkExist = (links: ISankeyLink[], newLink: ISankeyLink) => {
  for (const link of links) {
    if (link.source === newLink.source && link.target === newLink.target)
      return true;
  }
  return false;
};

export default isLinkExist;
