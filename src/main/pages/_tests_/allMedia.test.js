import React from "react";
import renderer from "react-test-renderer";
import { Patient } from "../../components/Patient";
import { Movies } from "../../components/Movies";
import { Movie } from "../../components/Movie";
import { Warnings } from "../../components/Warnings";
import { Warning } from "../../components/Warning";
import allMedia from '../allMedia';

describe("<allMedia/>", () => {
  it("renders correctly", () => {
    const navigate = jest.fn();
    const user = new Patient(
      "TESTId",
      "Patient",
      "Bob",
      "Bobby",
      "04-08-1998",
      "test@gmail.com",
      "password",
      "male",
      "5 testing lane",
      "liverpool",
      "TR6 0GH",
      "12345678",
      ["Flashing lights"],
      ["Absense Seizure"],
      "4",
      "1",
      ["Anxiety"]
    );
    var moviesX = new Movies();
    var movies =
      '{"movies":[{"_id":"616d9e5ed7e15f4acaf7dbd9","title":"John Wick: Chapter 2","length":"2:2:01","warnings":[{"start_time":"0:40:33","end_time":"0:40:57"},{"start_time":"0:44:35","end_time":"0:44:55"},{"start_time":"1:3:42","end_time":"1:3:59"},{"start_time":"1:16:11","end_time":"1:16:24"},{"start_time":"1:24:35","end_time":"1:24:52"},{"start_time":"1:27:54","end_time":"1:28:12"},{"start_time":"1:34:27","end_time":"1:34:52"},{"start_time":"1:44:10","end_time":"1:44:28"},{"start_time":"1:49:43","end_time":"1:50:03"},{"start_time":"1:57:43","end_time":"1:58:01"}]},{"_id":"61a0ef22452054bb4e975d6a","title":"John Wick","length":"1:41:01","warnings":[{"start_time":"0:13:42","end_time":"0:13:56"},{"start_time":"0:14:16","end_time":"0:14:38"},{"start_time":"0:31:27","end_time":"0:31:41"},{"start_time":"0:50:17","end_time":"0:50:34"},{"start_time":"1:1:15","end_time":"1:1:31"},{"start_time":"1:4:53","end_time":"1:5:12"},{"start_time":"1:11:51","end_time":"1:12:17"},{"start_time":"1:17:53","end_time":"1:18:08"},{"start_time":"1:35:13","end_time":"1:35:34"},{"start_time":"1:39:6","end_time":"1:39:25"},{"start_time":"0:40:33","end_time":"0:40:57"},{"start_time":"0:44:35","end_time":"0:44:55"},{"start_time":"1:3:42","end_time":"1:3:59"},{"start_time":"1:16:11","end_time":"1:16:24"},{"start_time":"1:24:35","end_time":"1:24:52"},{"start_time":"1:27:54","end_time":"1:28:12"},{"start_time":"1:34:27","end_time":"1:34:52"},{"start_time":"1:44:10","end_time":"1:44:28"},{"start_time":"1:49:43","end_time":"1:50:03"},{"start_time":"1:57:43","end_time":"1:58:01"}]},{"_id":"61a242b6e6efa052217ce167","title":"Hitman","length":"1:52:49","warnings":[{"start_time":"0:30:50","end_time":"0:30:04"},{"start_time":"0:02:54","end_time":"0:02:22"},{"start_time":"0:07:04","end_time":"0:06:41"}],"createdAt":"2021-11-27T14:37:42.749Z","updatedAt":"2021-12-01T17:26:38.810Z","__v":0},{"_id":"61a3c3dfb8214d9af1e44910","title":"John Wick: chapter 3","length":"2:20:10","warnings":[{"start_time":"15:20:04","end_time":"14:40:05"},{"start_time":"13:10:44","end_time":"13:40:01"}],"createdAt":"2021-11-28T18:01:03.403Z","updatedAt":"2021-12-03T10:22:24.487Z","__v":0}]}';
    movies = JSON.parse(movies);
    const moviesList = [];
    const moviesArray = movies.movies;
    for (var i = 0; i < moviesArray.length; i++) {
      var warningsList = [];
      const details = moviesArray[i];
      const warningsArray = moviesArray[i].warnings;
      for (var x = 0; x < warningsArray.length; x++) {
        const warning = new Warning(
          warningsArray[x].start_time,
          warningsArray[x].end_time
        );
        warningsList.push(warning);
      }
      const warning = new Warnings(warningsList);
      const movie = new Movie(
        details._id,
        details.title,
        details.length,
        warning
      );
      moviesList.push(movie);
    }
    moviesX.setMovies(moviesList);

    const route = { Patient: "", Movies: moviesList, Patients: "", User: user };
    const tree = renderer
      .create(<allMedia route={route} navigation={navigate} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
