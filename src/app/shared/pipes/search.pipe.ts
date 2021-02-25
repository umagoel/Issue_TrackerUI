import { Pipe, PipeTransform } from '@angular/core';
import Fuse from 'fuse.js';
import { Dictionary, head } from 'lodash';

@Pipe({
name: 'search',
})
export class SearchPipe implements PipeTransform {
public readonly options: Dictionary<boolean | number | Array<{}>> = {
shouldSort: true,
threshold: 0.1,
location: 0,
distance: 500,
maxPatternLength: 32,
isCaseSensitive: false,
minMatchCharLength: 1,
keys: [],
};

public transform<T>(value: Array<T> = [], searchKey: string, propArray: Array<string> = []): Array<T> {
if (!searchKey) {
return [...value];
}

if (propArray && propArray.length) {
this.options.keys = propArray;
return new Fuse(value, this.options).search(searchKey).map((result) => result.item);
}
if (head(value)) {
this.options.keys = Object.keys(head(value));
}

return new Fuse(value, this.options).search(searchKey).map((result) => result.item);
}
}
