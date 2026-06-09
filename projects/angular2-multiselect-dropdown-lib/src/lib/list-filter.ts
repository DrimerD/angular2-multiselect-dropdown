import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter',
  pure: true,
})
export class ListFilterPipe implements PipeTransform {
  public filteredList: any = [];

  transform(
    items: any[],
    filter: string | undefined | null,
    searchBy: string[] | undefined,
  ): any[] {
    if (!items || !filter || filter === '') {
      return items;
    }

    const filterTerm = filter.toLowerCase();

    this.filteredList = items.filter((item: any) =>
      this.applyFilter(item, filter, searchBy),
    );
    return this.filteredList;
  }

  applyFilter(item: any, filter: any, searchBy: string[] | undefined): boolean {
    let found = false;
    if (searchBy.length > 0) {
      if (item.grpTitle) {
        found = true;
      } else {
        for (let t = 0; t < searchBy.length; t++) {
          if (filter && item[searchBy[t]] && item[searchBy[t]] !== '') {
            if (
              item[searchBy[t]].toString().toLowerCase().indexOf(filter) >= 0
            ) {
              found = true;
            }
          }
        }
      }
    } else {
      if (item.grpTitle) {
        found = true;
      } else {
        for (const prop in item) {
          if (filter && item[prop]) {
            if (item[prop].toString().toLowerCase().indexOf(filter) >= 0) {
              found = true;
            }
          }
        }
      }
    }

    return found;
  }
}
