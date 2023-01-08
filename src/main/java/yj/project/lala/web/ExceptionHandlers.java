package yj.project.lala.web;

import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlers {

    @ExceptionHandler({IllegalStateException.class})
    public ErrorResponse handleBadRequestException(Throwable throwable) {
        return ErrorResponse.builder(throwable, HttpStatus.BAD_REQUEST, throwable.getMessage()).build();
    }
}
