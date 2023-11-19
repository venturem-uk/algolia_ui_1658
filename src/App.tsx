import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import React from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  InstantSearch,
  Breadcrumb,
  Configure,
  ClearRefinements,
  CurrentRefinements,
  DynamicWidgets,
  HierarchicalMenu,
  Highlight,
  Hits,
  HitsPerPage,
  Menu,
  Pagination,
  RangeInput,
  RefinementList,
  PoweredBy,
  SearchBox,
  SortBy,
  ToggleRefinement,
  Snippet
} from "react-instantsearch";

import {
  Panel,
  QueryRuleContext,
  QueryRuleCustomData,
  Refresh
} from "./components";
import { Tab, Tabs } from "./components/layout";

import "./App.css";

const searchClient = algoliasearch(
  "S4KTODFFQS",
  "b3155e7f2d4dc26d2dd82103600cb145"
);

export function App() {
  return (
    <div className="container">
      <Header title="" backgroundImage="./src/images/eCommHeaderTitle.png" />

      <InstantSearch
        searchClient={searchClient}
        indexName="ecom_index"
        routing={true}
        insights={true}
      >
        <Configure
          ruleContexts={[]}
          userToken="97ec7f60966ed983610a07a6306264cf"
        />

        <div className="Container">
          <div>
            <DynamicWidgets>
              <Panel header="Brands">
                <RefinementList
                  attribute="brand"
                  searchable={true}
                  searchablePlaceholder="Search brands"
                  showMore={true}
                />
              </Panel>
              <Panel header="Categories">
                <Menu attribute="categories" showMore={true} />
              </Panel>
              <Panel header="Hierarchy">
                <HierarchicalMenu
                  attributes={[
                    "hierarchicalCategories.lvl0",
                    "hierarchicalCategories.lvl1",
                    "hierarchicalCategories.lvl2"
                  ]}
                  showMore={true}
                />
              </Panel>
              <Panel header="Price">
                <RangeInput attribute="price" precision={1} />
              </Panel>
              <Panel header="Free Shipping">
                <ToggleRefinement
                  attribute="free_shipping"
                  label="Free shipping"
                />
              </Panel>
            </DynamicWidgets>
          </div>
          <div className="Search">
            <Breadcrumb
              attributes={[
                "hierarchicalCategories.lvl0",
                "hierarchicalCategories.lvl1",
                "hierarchicalCategories.lvl2"
              ]}
            />

            <SearchBox placeholder="Search" autoFocus />

            <div className="Search-header">
              <PoweredBy />
              <HitsPerPage
                items={[
                  { label: "5 hits per page", value: 5, default: true },
                  { label: "10 hits per page", value: 10 }
                ]}
              />
              <SortBy
                items={[
                  { label: "Relevance", value: "ecom_index" },
                  { label: "Price (asc)", value: "ecom_index_price_asc" },
                  { label: "Price (desc)", value: "ecom_index_price_desc" }
                ]}
              />
              <Refresh />
            </div>

            <div className="CurrentRefinements">
              <ClearRefinements />
              <CurrentRefinements
                transformItems={(items) =>
                  items.map((item) => {
                    const label = item.label.startsWith(
                      "hierarchicalCategories"
                    )
                      ? "Hierarchy"
                      : item.label;

                    return {
                      ...item,
                      attribute: label
                    };
                  })
                }
              />
            </div>

            <QueryRuleContext
              trackedFilters={{
                brand: () => ["Apple"]
              }}
            />

            <QueryRuleCustomData>
              {({ items }) => (
                <>
                  {items.map((item) => (
                    <a href={item.link} key={item.banner}>
                      <img src={item.banner} alt={item.title} />
                    </a>
                  ))}
                </>
              )}
            </QueryRuleCustomData>

            <Hits hitComponent={Hit} />
            <Pagination className="Pagination" />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

type HitType = AlgoliaHit<{
  image: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  rating: string;
}>;

function Hit({ hit, sendEvent }) {
  return (
    <div
      className="container"
      onClick={() => sendEvent("click", hit, "Product Clicked")}
    >
      <div className="Search-result-title">
        <Highlight attribute="name" highlightedTagName="mark" hit={hit} />
      </div>{" "}
      <p></p>
      <div className="Search-result-image">
        <img src={hit.image} alt={hit.name} />
        <div className="Hit-price"> $ {hit.price}</div>
      </div>
      <div className="Search-result-item">
        <p className="Search-result-category">{hit.categories[0]}</p>
        <p> </p>
        <Snippet attribute="description" highlightedTagName="mark" hit={hit} />
      </div>
    </div>
  );
}
