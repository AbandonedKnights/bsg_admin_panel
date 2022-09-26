import { Link } from "react-router-dom";
import pageContents from "../helpers/page_contents";

export default function Home(props) {
  const pageContent = pageContents.home;
  const community = [
    {
      banner: "/theme_files/assets/icon-1.webp",
      title: "Learn crypto",
      description:
        "Learn about crypto from experts, enthusiasts, and fellow community members. Our community is a think tank made of crypto traders, developers, miners, and influencers.",
    },
    {
      banner: "/theme_files/assets/icon-2.webp",
      title: "Promote Crypto",
      description:
        "Know why crypto is hailed as the future of money. Get connected to a vast network of crypto enthusiasts, introduce new members, get your friends and family on board, propagate crypto knowledge, and adopt crypto before the world does.",
    },
    {
      banner: "/theme_files/assets/icon-3.webp",
      title: "Be An Influencer",
      description:
        "Grow from being ‘the influenced’ to an ‘influencer’ and become a leading figure within our global crypto community. Our community transforms not just the way you handle your finances, but also the way you lead your lives.",
    },
  ];
  return (
    <>
      <section className="header-const">
        <div className="row align-items-center">
          <div className="col-md">
            <img src="/theme_files/assets/banner-img.webp" />
          </div>
          <div className="col-md">
            <h1>Global Crypto Community</h1>
            <h5>EXPLORE CRYPTO WITH GCCHUB</h5>
            <p>
              Get connected with the most promising crypto projects and crypto
              thought leaders within the community.
            </p>
            <div>
              <Link to="/signup" className="btn btn-warning btn-head">
                GET STARTED <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <h1>Join the Community</h1>
              <p>
                Join the world’s leading crypto community leading the crypto
                revolution.
              </p>
            </div>
            <div className="col-md-9">
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
                {community.map((aboutSec, index) => (
                  <div class="col my-2">
                    <div className="card card-body text-center rounded h-100 rounded-card shadow border-0">
                      <div class="">
                        <img src={aboutSec.banner} alt={aboutSec.banner} />
                      </div>
                      <h5 className="card-title fw-bold">{aboutSec.title}</h5>
                      <p className="card-text">{aboutSec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        {pageContent.sections &&
          pageContent.sections.map((aboutSec, index) => (
            <div
              className={
                index % 2 == 0
                  ? "contsiner-fluid left-sec"
                  : "container-fluid right-sec"
              }
            >
              <div className="container">
                <div className="row align-items-center">
                  {aboutSec.banner && (
                    <div
                      className={
                        index % 2 == 0
                          ? "col-md order-last"
                          : "col-md order-first"
                      }
                    >
                      <img src={aboutSec.banner} />
                    </div>
                  )}
                  {aboutSec.descriptions && (
                    <div
                      className={
                        index % 2 == 0
                          ? "col-md order-first"
                          : "col-md order-last"
                      }
                    >
                      {aboutSec.descriptions.map((desc) => (
                        <div className="mb-2">
                          {desc.title && <h1 className="my-0">{desc.title}</h1>}
                          {desc.subtitle && (
                            <h5 className="my-0">{desc.subtitle}</h5>
                          )}
                          {desc.description && (
                            <p className="my-0">{desc.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        {/* <main>
  <div className="preloader bg-soft flex-column justify-content-center align-items-center">
    <img
      className="loader-element animate__animated animate__jackInTheBox"
      src="/theme_files/assets/logo-webf.png"
      height="60"
      alt="Volt logo"
    />
  </div>

  <section className="section-header pb-9 pb-lg-12 bg-primary text-white">
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <img
            className="navbar-brand-dark mb-4"
            src="/theme_files/assets/logo-webf.png"
            height="120"
            alt="Logo light"
          />
          <h1 className="display-1">Volt</h1>
          <div className="mb-5">
            <h2 className="h3 text-muted mr-3">Free Bootstrap 5 Dashboard</h2>
          </div>

          <div className="d-flex justify-content-center align-items-end flex-wrap mb-6">
            <a
              href="/dashboard"
              className="btn btn-secondary text-dark mr-4 mb-3 mb-lg-0"
            >
              <span className="fas fa-chart-line mr-2 d-none d-sm-inline"></span>
              Dashboard Demo
            </a>
            <div className="mb-3 mb-lg-0">
              <a
                className="github-button"
                href="https://github.com/themesberg/volt-bootstrap-5-dashboard"
                data-color-scheme="no-preference: dark; light: light; dark: light;"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star themesberg/volt-bootstrap-5-dashboard on GitHub"
              >
                Star
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-center flex-column mb-6">
            <a href="https://themesberg.com" target="_blank">
              <img
                src="/theme_files/assets/logo-webf.png"
                className="d-block mx-auto mb-3"
                height="25"
                //width="25"
                alt="Themesberg Logo"
              />
              <span className="text-muted font-small">
                A Themesberg production
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
      <svg
        className="fill-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3000 185.4"
      >
        <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z"></path>
      </svg>
    </figure>
  </section>
  <div className="section pt-0">
    <div className="container mt-n10 mt-lg-n12 z-2">
      <div className="row justify-content-center">
        <div className="col-12">
          <img
            src="/theme_files/assets/img/mockup-presentation.png"
            alt="Mockup presentation"
          />
        </div>
      </div>
    </div>
  </div>
  <section className="section section-sm pt-0">
    <div className="container">
      <div className="row justify-content-center mb-5 mb-lg-6">
        <div className="col-12 text-center">
          <h2 className="h1 px-lg-5">10 hand-crafted pages</h2>
          <p className="lead px-lg-10">
            Every page from Volt has been carefully built to provide all the
            necessary pages your startup will require
          </p>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-6 mb-5">
          <a
            href="/dashboard"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/overview.jpg"
              alt="Dashboard page preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Overview <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/transactions"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/transactions.jpg"
              alt="Transactions page preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Transactions <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/settings"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/settings.jpg"
              alt="Settings page preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Settings <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/signin"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/sign-in.jpg"
              alt="Sign In page preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Sign In <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/signup"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/sign-up.jpg"
              alt="Sign Up page preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Sign Up <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/lock"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/lock.jpg"
              alt="Lock page preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Sign Up <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/forgot-password"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/forgot-password.jpg"
              alt="Forgot password preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Forgot password
                <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/reset-password"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/reset-password.jpg"
              alt="Reset password preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                Reset password <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/404"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/404.jpg"
              alt="404 error preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                404 <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
        <div className="col-6 mb-5">
          <a
            href="/500"
            className="page-preview page-preview-lg scale-up-hover-2"
          >
            <img
              className="shadow-lg rounded scale"
              src="/theme_files/assets/img/pages/500.jpg"
              alt="500 error preview"
            />
            <div className="text-center show-on-hover">
              <h6 className="m-0 text-center text-white">
                500 <i className="fas fa-external-link-alt ml-2"></i>
              </h6>
            </div>
          </a>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 col-md-3 text-center mb-4">
          <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle icon-secondary mb-4">
            <span className="fas fa-pager"></span>
          </div>
          <h3 className="font-weight-bolder">20</h3>
          <p className="text-gray">Dashboard Pages</p>
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle icon-secondary mb-4">
            <span className="fas fa-puzzle-piece"></span>
          </div>
          <h3 className="font-weight-bolder">800+</h3>
          <p className="text-gray">Premium Components</p>
        </div>
        <div className="col-6 col-md-3 text-center">
          <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle icon-secondary mb-4">
            <span className="fab fa-sass"></span>
          </div>
          <h3 className="font-weight-bolder">Workflow</h3>
          <p className="text-gray">Sass & Gulp</p>
        </div>
        <div className="col-6 col-md-3 text-center">
          <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle icon-secondary mb-4">
            <span className="fab fa-js-square"></span>
          </div>
          <h3 className="font-weight-bolder">Vanilla</h3>
          <p className="text-gray">Javascript</p>
        </div>
      </div>
    </div>
  </section>
  <section className="section section-lg bg-primary text-white">
    <div className="container">
      <div className="row justify-content-center mb-5 mb-lg-6">
        <div className="col-12 text-center">
          <h2 className="h1 px-lg-5">Awesome Features</h2>
          <p className="lead px-lg-8">
            You get all Bootstrap components fully customized. Besides, you
            receive numerous plugins out of the box and ready to use.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="fab fa-bootstrap"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Bootstrap 5</h5>
              <p>Built with the most popular CSS Framework</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="fab fa-sass"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Sass</h5>
              <p>Variables and mixins to empower development</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="fas fa-mobile-alt"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Responsive</h5>
              <p>All pages and components are 100% responsive</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="fab fa-gulp"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Gulp</h5>
              <p>Gulp & BrowserSync for a flawless workflow</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="far fa-images"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Creative rights</h5>
              <p>All images, icons and fonts are licensed & free to use</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="far fa-file-alt"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Documentation</h5>
              <p>Everything that comes with Volt is well documented</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="fab fa-js-square"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Vanilla JS</h5>
              <p>jQuery is not a required dependency for Volt</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-white shadow-soft text-primary rounded mb-4">
            <div className="px-3 px-lg-4 py-5 text-center">
              <span className="icon icon-lg mb-4">
                <span className="fas fa-pen-fancy"></span>
              </span>
              <h5 className="font-weight-bold text-primary">Design</h5>
              <p>Crafted by professional UI/UX designers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="section section-lg line-bottom-soft">
    <div className="container">
      <div className="row justify-content-center mb-5 mb-lg-6">
        <div className="col-12 text-center">
          <h2 className="h1 px-lg-5">What's inside?</h2>
          <p className="lead px-lg-8">
            We have carefully crafted the perfect folder structure to ensure
            that finding the files you're looking for are easily reachable
            and well organized.
          </p>
        </div>
      </div>
      <div className="row d-flex align-items-center">
        <div className="col-12 col-lg-6 mb-4">
          <div className="d-none d-lg-block mt-5">
            <h4>You need only HTML, CSS and Javascript?</h4>
            <p className="lead mb-4">
              Don't worry, we got you covered. We have a folder called
              <code className="text-danger">html&css</code> which includes only
              the basic HTML5, CSS3 and Javascript technologies.
            </p>
            <a
              href="https://themesberg.com/docs/volt-bootstrap-5-dashboard/getting-started/file-structure/"
              target="_blank"
              className="btn btn-md btn-secondary text-dark"
            >
              <i className="fas fa-book mr-2"></i> Docs v1.0
            </a>
          </div>
        </div>
        <div className="col-12 col-lg-6 order-lg-first d-flex justify-content-center">
          <ul className="d-block fmw-100 list-style-none folder-structure">
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="Main folder that you will be working with"
            >
              <i className="fas fa-folder mr-2"></i>src
            </li>
            <li>
              <ul className="list-style-none pl-4">
                <li
                  data-toggle="tooltip"
                  data-placement="left"
                  title="CSS, Images, Fonts and Javascript"
                >
                  <i className="fas fa-folder mr-2"></i> assets
                </li>
                <li
                  data-toggle="tooltip"
                  data-placement="left"
                  title="HTML templates"
                >
                  <i className="fas fa-folder mr-2"></i> pages
                </li>
                <li
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Partials are HTML snippets that are included in multiple pages, such as the menu or footer"
                >
                  <i className="fas fa-folder mr-2"></i> partials
                </li>
                <li
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Sass source files"
                >
                  <i className="fas fa-folder mr-2"></i> scss
                </li>
                <li
                  data-toggle="tooltip"
                  data-placement="left"
                  title="The page you're looking at right now. Call it inception."
                >
                  <i className="fab fa-html5 mr-2 text-secondary"></i>
                  index.html
                </li>
              </ul>
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="Volt with only HTML, CSS and Javascript"
            >
              <i className="fas fa-folder mr-2 text-muted"></i> html&css
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="Temporary folder that is created when serving files with BrowserSync"
            >
              <i className="fas fa-folder text-muted mr-2"></i>.temp
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="Minified version of the project"
            >
              <i className="fas fa-folder mr-2 text-muted"></i> dist
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="Project dependencies from package.json"
            >
              <i className="fas fa-folder text-muted mr-2"></i> node_modules
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="Development workflow commands. We have them well documented."
            >
              <i className="fab fa-js-square mr-2 text-warning"></i> gulpfile.js
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="Project details and dependencies."
            >
              <i className="fas fa-file-code mr-2 text-tertiary"></i>
              package.json
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="No project can miss a README :)"
            >
              <i className="fas fa-file-code mr-2 text-tertiary"></i> README.md
            </li>
            <li
              data-toggle="tooltip"
              data-placement="left"
              title="This file ensures that generated files and folder are ignored by Git. (eg. node_modules)"
            >
              <i className="fas fa-file-code mr-2 text-tertiary"></i> .gitignore
            </li>
          </ul>
        </div>
        <div className="col-12 mt-5 d-lg-none">
          <h5>You need only HTML, CSS and Javascript?</h5>
          <p>
            Don't worry, we got you covered. We have a folder called
            <code className="text-danger">html&css</code> which includes only
            the basic HTML5, CSS3 and Javascript technologies.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="section section-lg bg-primary">
    <div className="container">
      <div className="row justify-content-center text-center text-white mb-5">
        <div className="col-12">
          <h2 className="h1 font-weight-light mb-3">
            Less <span className="font-weight-bold">work</span>, more
            <span className="font-weight-bold">flow</span>.
          </h2>
          <p className="lead px-lg-8">
            Boost productivity with BrowserSync. Sass changes are reflected
            instantly and pages scroll and refresh on devices as you work.
          </p>
        </div>
      </div>
      <div className="row justify-content-center mb-6">
        <div className="col-md-10 col-xl-9">
          <div className="position-relative">
            <div className="rounded bg-white p-4 text-dark mb-2">
              <div className="mb-3">
                <div className="font-weight-bold">&gt; $ npm install</div>
                <div className="text-gray">Everything’s installed!</div>
              </div>
              <div className="mb-3">
                <div className="font-weight-bold">&gt; $ gulp</div>
                <div className="text-gray">SCSS watching</div>
                <div className="text-gray">LiveReload started</div>
                <div className="text-gray">Opening localhost:3000</div>
              </div>
              <div>
                <div className="font-weight-bold">&gt; $ that's it?</div>
                <div className="text-gray">It's that simple!</div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-white text-center">
            Looks unfamiliar? Don’t worry! Our
            <a
              className="text-white text-underline font-weight-bold"
              href="https://themesberg.com/docs/volt-bootstrap-5-dashboard/getting-started/quick-start/"
              target="_blank"
            >
              documentation
            </a>
            has got you covered.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="section section-lg bg-white">
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8">
          <h2 className="h1 font-weight-light mb-3">Open source</h2>
          <p className="lead mb-4">
            Volt is an open source project under the MIT License. Give us a
            lucky star to spread the open source love ❤️
          </p>
          <div className="d-flex align-items-center">
            <a
              href="https://github.com/themesberg/volt-bootstrap-5-dashboard"
              target="_blank"
              className="btn btn-dark mr-4"
            >
              View on GitHub
            </a>

            <div className="mt-2">
              <a
                className="github-button"
                href="https://github.com/themesberg/volt-bootstrap-5-dashboard"
                data-color-scheme="no-preference: dark; light: light; dark: light;"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star /themesberg/volt-bootstrap-5-dashboard on GitHub"
              >
                Star
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="github-big-icon">
            <span className="fab fa-github"></span>
          </div>
        </div>
      </div>
      <div className="row mt-6">
        <div className="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0">
          <div className="card border-light p-4">
            <div className="card-header bg-white border-0 pb-0">
              <span className="d-block">
                <span className="h2 text-primary font-weight-bold align-top">
                  Free Demo
                </span>
              </span>
            </div>

            <div className="card-body">
              <ul className="list-group list-group-flush price-list">
                <li className="list-group-item bg-white border-0 pl-0">
                  <strong>100</strong> Components
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <strong>11</strong> Example Pages
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-danger mr-2">
                    <span className="fas fa-times-circle"></span>
                  </span>
                  MapBox
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-danger mr-2">
                    <span className="fas fa-times-circle"></span>
                  </span>
                  Calendar
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-danger mr-2">
                    <span className="fas fa-times-circle"></span>
                  </span>
                  SVG Map
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-danger mr-2">
                    <span className="fas fa-times-circle"></span>
                  </span>
                  Widgets
                </li>
                <li className="list-group-item bg-white border-0 pl-0 pb-0">
                  <span className="icon-danger mr-2">
                    <span className="fas fa-times-circle"></span>
                  </span>
                  Premium Support
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0">
          <div className="card border-light p-4 pt-5 pb-4 mt-lg-n5">
            <div className="card-header bg-white border-0 pb-0">
              <span className="d-block">
                <span className="h2 text-primary font-weight-bold align-top">
                  Pro Version
                </span>
              </span>
            </div>

            <div className="card-body">
              <ul className="list-group list-group-flush price-list">
                <li className="list-group-item bg-white border-0 pl-0">
                  <strong>1000+</strong> Components
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <strong>20</strong> Example Pages
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  Dashboard included
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-success mr-2">
                    <span className="fas fa-check-circle"></span>
                  </span>
                  MapBox
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-success mr-2">
                    <span className="fas fa-check-circle"></span>
                  </span>
                  Calendar
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-success mr-2">
                    <span className="fas fa-check-circle"></span>
                  </span>
                  SVG Map
                </li>
                <li className="list-group-item bg-white border-0 pl-0">
                  <span className="icon-success mr-2">
                    <span className="fas fa-check-circle"></span>
                  </span>
                  Widgets
                </li>
                <li className="list-group-item bg-white border-0 border-0 pl-0 pb-0">
                  <span className="icon-success mr-2">
                    <span className="fas fa-check-circle"></span>
                  </span>
                  Premium Support
                </li>
              </ul>
              <a
                href="https://themesberg.com/product/admin-dashboard/volt-premium-bootstrap-5-dashboard"
                target="_blank"
                className="btn btn-secondary text-dark mt-4 btn-block"
              >
                Volt Pro <i className="fas fa-external-link-alt ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main> */}
      </section>
    </>
  );
}
