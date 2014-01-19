/*jslint plusplus: true */
/*global console */
(function (exports) {
    "use strict";

    function ancestors(element) {
        var result = element.parent ? ancestors(element.parent) : [];

        result.push(element);

        return result;
    }

    var History = { Shallow: 1, Deep: 2 };

    function State(name, parent, history) {
        this.name = name;
        this.parent = parent;
        this.history = history;
        this.transitions = [];
        
        if (this.parent && !this.parent.initial) {
            this.parent.initial = this;
        }
    }

    State.prototype.isComplete = function () {
        return this.current || this.transitions;
    };

    State.prototype.initialise = function (history) {
        this.beginEntry();
        this.endEntry(history);
    };

    State.prototype.leave = function () {
        var i, len;

        if (this.current) {
            this.current.leave();
        }

        if (this.exit) {
            for (i = 0, len = this.exit.length; i < len; ++i) {
                this.exit[i]();
            }
        }
    };

    State.prototype.beginEntry = function () {
        var i, len;

        if (this.entry) {
            for (i = 0, len = this.entry.length; i < len; ++i) {
                this.entry[i]();
            }
        }

        if (this.parent) {
            this.parent.current = this;
        }
    };

    State.prototype.endEntry = function (history) {
        if (this.initial) {
            (history || this.history ? this.current || this.initial : this.initial).initialise(history || this.history === History.Deep ? History.Deep : undefined);
        }

        if (this.isComplete()) {
            this.process(history || this.history === History.Deep ? History.Deep : undefined);
        }
    };

    State.prototype.toString = function () {
        return this.parent ? this.parent.toString() + "." + this.name : this.name;
    };

    State.prototype.process = function (message, history) {
        var transition, i, len;

        for (i = 0, len = this.transitions.length; i < len; ++i) {
            if (this.transitions[i].guard(message)) {
                if (transition) {
                    throw "Multiple outbound transition guards evaluated true at " + this.toString() + " for " + message.toString();
                }

                transition = this.transitions[i];
            }
        }

        if (transition) {
            transition.traverse(message, history);
        }

        return transition || (this.initial ? this.current.process(message, history) : false);
    };

    function Transition(source, target, guard, effect) {
        this.guard = guard = guard || function () { return true; };
        this.effect = effect ? (effect instanceof Array ? effect : [effect]) : [];

        if (target) {
            var sourceAncestors = ancestors(source.parent),
                targetAncestors = ancestors(target),
                i = 0;

            while (sourceAncestors.length > i && targetAncestors.length > i && sourceAncestors[i] === targetAncestors[i]) {
                i++;
            }

            this.source = sourceAncestors[i] || source;
            this.target = targetAncestors.slice(i);
        }

        source.transitions.push(this);
    }

    Transition.prototype.traverse = function (message, history) {
        var i, len, last;

        if (this.source) {
            this.source.leave();
        }

        for (i = 0, len = this.effect.length; i < len; ++i) {
            this.effect[i](message);
        }
       
        if (this.target) {
            for (i = 0, len = this.target.length; i < len; last = this.target[i], i++) {
                this.target[i].beginEntry();
            }

            last.endEntry(history);
        }
    };

    exports.History = History;
    exports.State = State;
    exports.Transition = Transition;

}(this.exports || this));