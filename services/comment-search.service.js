const { sortValue, filterField } = require("../enums/common.enum");
const { ValidationError } = require("../exceptions/validation-error.exception");
const { ProfileModel } = require("../models/profile.model");

class CommentSearchService {
  _profileId;
  _sort = sortValue.RECENT;
  _filterField = filterField.NONE;
  _filterValue;

  constructor(profileId) {
    this._profileId = profileId
  }

  withSort(sort) {
    this._sort = sort
    return this
  }

  withFilter(field, value) {
    this._filterField = field
    this._filterValue = value
    return this
  }

  async search() {
    const profileExist = await ProfileModel.exists({
      _id: this._profileId
    })

    if (!profileExist) {
      throw new ValidationError("Profile not found")
    }

    const comments = await ProfileModel.aggregate([
      {
        $match: { _id: this._profileId }
      },
      ...this._generateFilterAndSortAggregates(),
    ])

    return comments[0].comments
  }

  _generateFilterAndSortAggregates() {
    const additionalAggregates = []

    if (this._filterField != filterField.NONE) {
      additionalAggregates.push({
        $project: {
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: {
                $eq: [`$\$comment.${this._filterField}`, this._filterValue]
              }
            }
          }
        },
      })
    }

    if (this._sort === sortValue.RECENT) {
      additionalAggregates.push({
        $project: {
          comments: {
            $sortArray: {
              input: "$comments",
              sortBy: { created_at: -1 }
            }
          }
        },
      })
    }

    if (this._sort === sortValue.BEST) {
      additionalAggregates.push({
        $project: {
          comments: {
            $sortArray: {
              input: "$comments",
              sortBy: { likes: -1 }
            }
          }
        },
      })
    }

    return additionalAggregates
  }

  _generate
}

module.exports = { CommentSearchService }
