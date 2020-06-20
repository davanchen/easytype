import * as ts from 'typescript';
import * as parser from 'comment-parser';

export function parseComment(content: string) {
    let matchs = (/\/\*((\s|.)*?)\*\//g).exec(content);
    if (matchs) {
        const doc = parser(matchs[0]);
        return doc.length ? doc[0].description : '';
    }
    matchs = (/\/\/(.*)/g).exec(content);
    if (matchs) {
        return matchs[1].trim();
    }
}

export function getComment(node: ts.Node, parse: boolean = true, multiline: boolean = true) {
    try {
        if (node.pos < 0 || node.end < 0) {
            return '';
        }
        const text = node.getFullText();
        const rang = ts.getLeadingCommentRanges(text, 0);
        if (rang && rang.length > 0) {
            let comment = text.substring(rang[0].pos, rang[0].end);
            if (!parse) {
                return comment.trim();
            }
            comment = parseComment(comment);
            if (multiline) {
                return comment;
            }
            const arr = comment.split('\n');
            return arr.length > 1 ? arr[0] : comment;
        }

    } catch (err) {

    }

    return '';
}
