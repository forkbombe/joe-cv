import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { addSection, updateSectionOrder } from '../actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import ManageSections from './ManageSections.jsx';
import Section from './Section.jsx';
import Footer from './Footer.jsx';
import Navigation from './Navigation.jsx';
import Breakout from './Breakout.jsx';
import Settings from './Settings.jsx';
import Home from './Home';

const getSlug = (i, sectionCount) => {
    let slug = '/section/' + i;
    if(i>-1 && i<sectionCount) {
        return slug;
    }
    return false;
};

class App extends Component {

    getDynamicSectionRoutes() {
        let sections = this.props.sections;
        let navSections = [],
            slug,
            content,
            title;

        for(let i=0; i<sections.length;i++) {
            let ii = i;
            //slug = '/'+sections[ii].title.toLowerCase().replace(' ', '-');
            slug = getSlug(ii, sections.length);
            content = sections[ii].content;
            title = sections[ii].title;

            navSections[i] = <Switch key={ii}><Route exact path={slug} render={() =>
                <Section
                    prevRoute={getSlug(ii-1, sections.length)}
                    nextRoute={getSlug(ii+1, sections.length)}
                    index={ii}
                    title={title}
                    content={content} />}
            /></Switch>
        }

        return navSections;
    }

    render() {
        let side = 'side';

        return(
            <React.Fragment>
                <CssBaseline />
                <Router basename={process.env.PUBLIC_URL}>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                        {this.getDynamicSectionRoutes()}
                        <Switch>
                            <Route exact path="/manage-sections" component={ManageSections} />
                        </Switch>
                        <Switch>
                            <Route exact path="/settings" component={Settings} />
                        </Switch>
                        <Switch>
                            <Route exact path="/breakout" component={Breakout} />
                        </Switch>

                        <Footer />
                    </div>
                </Router>
                <div id={side}>
                    <Navigation />
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        sections : state.manageSections
    }
}

export default connect(mapStateToProps, {addSection, updateSectionOrder})(App);