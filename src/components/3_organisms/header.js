import React from "react";
import UtilityNav from "../2_molecules/navigation/utilityNav";
import PrimaryNav from "../2_molecules/navigation/primaryNav";
import PrimaryMobile from "../2_molecules/navigation/primaryMobile";
import UtilityMobile from "../2_molecules/navigation/utilityMobile";

import WhyMenus from "../2_molecules/navigation/whyMenus";
import SolutionsMenus from "../2_molecules/navigation/solutionsMenus";
import ProductsMenus from "../2_molecules/navigation/productsMenus";
import PricingMenus from "../2_molecules/navigation/pricingMenus";
import CommunityMenus from "../2_molecules/navigation/communityMenus";

const Header = () => (
  <header className="c-site-header" itemScope="itemscope" itemType="http://schema.org/WPHeader">
      <div className="o-layout__row c-site-header__topbar">
        <div className="o-layout__colset">
          <div className="o-layout__col">
            <div class="o-layout__module c-notification u-hidden">
              <a href="#" class="c-notification__link" target="_self">
                <span class="c-notification__tag"></span>
                <span class="c-notification__message"></span>
              </a>
            </div>
          </div>
          <div className="o-layout__col">
            <UtilityNav />
          </div>
        </div>
      </div>
      <div className="o-layout__row c-site-header__primary">
        <div className="o-layout__colset">
          <div className="o-layout__col">
            <div className="o-layout__module c-identity">
              <a href="https://linode.com" className="c-identity__link" itemProp="url" target="_self">
                <img alt="Linode Logo" className="c-identity__image" src="https://www.linode.com/wp-content/uploads/2021/01/Linode-Logo-Black.svg" itemProp="image" data-no-lazy="1"></img>
              </a>
            </div>
          </div>
          <PrimaryNav />
        </div>
      </div>
      <WhyMenus />
      <ProductsMenus />
      <SolutionsMenus />
      <PricingMenus />
      <CommunityMenus />
      <div className="o-layout__row c-sub-menu c-sub-menu--mobile" id="sub-menu--mobile">
        <div className="o-layout__colset">
          <div className="o-layout__col">
            <div className="o-layout__module">
              <PrimaryMobile />
            </div>
            <div className="o-layout__module">
              <UtilityMobile />
            </div>
            <div className="o-layout__module">
              <ul class="o-menu__list">
                <li class="o-menu__item o-menu__item--sign-up"><a class="o-menu__link" href="https://login.linode.com/signup?promo=signup100-2"><span class="o-menu__title">Sign Up</span></a></li>
              </ul>
            </div>
            <div className="o-layout__module">
              <form
                role="search"
                method="get"
                className="c-search"
                action="https://linode.com/"
              >
                <label htmlFor="s">
                    Search
                </label>
                <input
                    type="search"
                    placeholder="Search Linode"
                    defaultValue=""
                    name="s"
                ></input>
                <input
                  type="submit"
                  value="Search"
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
  </header>
);

export default Header;

(() => {
  // src/js/Main/main-menu.js
  var $header;
  var $main_menu;
  var $sub_menus;
  var mount = function() {
    bindElements();
    if ($header && $main_menu && $sub_menus) {
      bindEvents();
      setActiveMenuItem();
    }
  };
  var bindElements = function() {
    $header = document.querySelector(".c-site-header");
    $main_menu = document.querySelector(".c-main-menu");
    $sub_menus = document.querySelectorAll(".c-sub-menu");
  };
  var bindEvents = function() {
    $main_menu.addEventListener("click", function(event) {
      var $clicked_link = event.target.closest("a");
      if ($clicked_link === null || $clicked_link.getAttribute("href").charAt(0) !== "#")
        return;
      var $target_sub_menu = document.querySelector($clicked_link.getAttribute("href"));
      if ($target_sub_menu.classList.contains("active")) {
        closeAllSubMenus();
        $clicked_link.blur();
        $clicked_link.classList.remove("active");
        $target_sub_menu.classList.remove("active");
        setHtmlScrollState(true);
      } else {
        closeAllSubMenus();
        $clicked_link.classList.add("active");
        $target_sub_menu.classList.add("active");
        setHtmlScrollState(false);
      }
      event.preventDefault();
      return false;
    });
    $sub_menus.forEach(($sub_menu) => {
      $sub_menu.addEventListener("click", function(event) {
        if (event.target.classList.contains("c-sub-menu")) {
          closeAllSubMenus();
          setHtmlScrollState(true);
          return false;
        }
      });
    });
    document.addEventListener("keyup", function(event) {
      switch (event.keyCode) {
        case 27:
          closeAllSubMenus();
          document.activeElement.blur();
          setHtmlScrollState(true);
          break;
      }
    });
  };
  var closeAllSubMenus = function() {
    $sub_menus.forEach(($sub_menu) => {
      $sub_menu.classList.remove("active");
    });
  };
  var setActiveMenuItem = function() {
    var current_path = window.location.pathname, $header_links = [];
    if (current_path === "/") {
      return;
    } else if (current_path.match(/^\/community\/questions\/.+/)) {
      current_path = "/community/questions/";
    } else if (current_path.match(/^\/blog|marketplace\/.+/)) {
      current_path = current_path.replace(/^\/([^\/]+)\/.+/, "/$1/");
    } else if (current_path.match(/^\/event\/.+/)) {
      current_path = "/events/";
    } else if (current_path.match(/^\/content\/.+/)) {
      current_path = "/resources/";
    } else if (current_path.match(/^\/spotlight\/.+/)) {
      current_path = "/craft-of-code/";
    } else if (current_path.match(/^\/award|media\-coverage|press\-release\/.+/)) {
      current_path = "/company/press/";
    }
    $header_links = $header.querySelectorAll("a.o-menu__link");
    for (let i = 0; i < $header_links.length; i++) {
      let $link = $header_links[i];
      let href_path = $link.getAttribute("href").split(/[?]/)[0];
      if (!href_path.endsWith(current_path)) {
        continue;
      }
      $link.classList.add("current");
      let $sub_menu = $link.closest(".c-sub-menu");
      if ($sub_menu !== null) {
        let $parent_links = $header.querySelectorAll('a[href="#' + $sub_menu.id + '"]');
        $parent_links.forEach(($link2) => {
          $link2.classList.add("current");
        });
      }
    }
  };
  var setHtmlScrollState = function(state) {
    $html.style.overflow = state ? "" : "hidden";
  };
  var $html = document.querySelector("html");
  if (!$html.classList.contains("fl-builder-edit")) {
    mount();
  }
  document.addEventListener("turbolinks:render", function(event) {
    mount();
  });

  // src/js/Main/header-notification.js
  var $notification;
  var $notification_link;
  var $notification_tag;
  var $notification_message;
  var mount2 = function() {
    $notification = document.querySelector(".c-site-header .c-notification");
    if ($notification) {
      $notification_link = $notification.querySelector(".c-notification__link");
      $notification_tag = $notification.querySelector(".c-notification__tag");
      $notification_message = $notification.querySelector(".c-notification__message");
      fetch("https://www.linode.com/wp-json/linode/v1/header-notification").then((response) => response.json()).then((data) => update(data));
    }
  };
  var update = function(data) {
    if (data && data.url && data.message && $notification && $notification_link && $notification_message) {
      $notification_link.href = data.url;
      if (data.tag) {
        $notification_tag.textContent = data.tag;
      } else {
        $notification_tag.remove();
      }
      $notification_message.textContent = data.message;
      $notification.classList.remove("u-hidden");
    }
  };
  var $html2 = document.querySelector("html");
  if (!$html2.classList.contains("fl-builder-edit")) {
    mount2();
  }
  document.addEventListener("turbolinks:render", function(event) {
    mount2();
  });
})();